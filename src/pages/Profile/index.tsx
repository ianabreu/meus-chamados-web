import { FiSettings, FiUpload } from "react-icons/fi";
import Title from "../../components/Title";
import { useAuthStore } from "../../store/auth";
import { useEffect, useRef, useState } from "react";
import avatar from "../../assets/avatar.png";
import "./styles-profile.css";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { api } from "../../services/apiConfig";
import toast from "react-hot-toast";

export default function Profile() {
  const { user, signOut, checkAuth } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(
    user && user.avatarUrl
  );
  const [imageAvatar, setImageAvatar] = useState<File | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (nameRef.current !== null) {
      nameRef.current.value = user?.name || "";
    }
    if (emailRef.current !== null) {
      emailRef.current.value = user?.email || "";
    }
    return () => {};
  }, [user]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData();
    const userName = nameRef.current?.value;
    if (!userName || userName === "") {
      alert("Preencha todos os campos!");
      return;
    }
    if (imageAvatar === null && userName === user?.name) {
      return;
    }
    formData.append("name", userName);
    if (imageAvatar !== null) {
      formData.append("avatar", imageAvatar);
    }
    setLoading(true);
    api
      .put("/users", formData)
      .then(() => {
        setImageAvatar(null);
        checkAuth();
        toast.success("Dados atualizados com sucesso!");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files !== null && event.target.files[0]) {
      const image = event.target.files[0];
      if (
        image.type === "image/jpg" ||
        image.type === "image/jpeg" ||
        image.type === "image/png"
      ) {
        setImageAvatar(image);
        setAvatarUrl(URL.createObjectURL(image));
      } else {
        alert("Envie uma imagem do tipo PNG ou JPEG");
        setImageAvatar(null);
        return;
      }
    }
  }

  function handleLogout() {
    signOut();
  }

  return (
    <>
      <Title icon={<FiSettings size={25} />}>Meu Perfil</Title>
      <form className="profile-area" onSubmit={handleSubmit}>
        <label htmlFor="avatar" className="label-avatar">
          <span>
            <FiUpload color="#FFF" />
          </span>
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png"
            name="avatar"
            id="avatar"
            onChange={handleFile}
          />
          {avatarUrl === null ? (
            <img src={avatar} alt="Foto de perfil" width={250} height={250} />
          ) : (
            <img
              src={avatarUrl}
              alt="Foto de perfil"
              width={250}
              height={250}
            />
          )}
        </label>
        <div className="input-area">
          <label htmlFor="">Nome</label>
          <Input placeholder="Digite seu nome" ref={nameRef} />
          <label htmlFor="">Email</label>
          <Input placeholder="" ref={emailRef} disabled />
          <Button type="submit" loading={loading}>
            Salvar
          </Button>
        </div>
      </form>
      <div className="profile-area">
        <Button type="button" onClick={handleLogout}>
          Sair
        </Button>
      </div>
    </>
  );
}
