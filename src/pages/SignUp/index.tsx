import { FormEvent, useRef } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/auth";
import { Link, useNavigate } from "react-router-dom";
import LOGO from "../../assets/logo.png";
import "../SignIn/styles-signin.css";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export default function SignUp() {
  const { signUp, loadingAuth } = useAuthStore();
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = nameRef.current?.value as string;
    const email = emailRef.current?.value as string;
    const password = passwordRef.current?.value as string;

    if (name === "" || email === "" || password === "") {
      return toast.error("Preencha todos os campos");
    }
    try {
      await signUp({ email, name, password });
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Erro ao cadastrar");
      }
    }
  }
  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={LOGO} alt="Logo do Sistema de Chamados" />
        </div>
        <form onSubmit={handleSubmit}>
          <h1>Nova Conta</h1>
          <Input ref={nameRef} type="text" placeholder="Seu nome" />
          <Input ref={emailRef} type="email" placeholder="email@email.com" />
          <Input ref={passwordRef} type="password" placeholder="******" />
          <Button type="submit" loading={loadingAuth}>
            Cadastrar
          </Button>
        </form>
        <Link to="/">Já possui uma conta?</Link>
      </div>
    </div>
  );
}
