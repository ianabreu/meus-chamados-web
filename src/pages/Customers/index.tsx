import { FiUser } from "react-icons/fi";
import Title from "../../components/Title";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useRef } from "react";

export default function Customers() {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const CnpjRef = useRef<HTMLInputElement | null>(null);
  const AdressRef = useRef<HTMLInputElement | null>(null);
  function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert("chamou");
  }
  return (
    <>
      <Title icon={<FiUser size={25} />}>Clientes</Title>
      <form className="profile-area" onSubmit={handleRegister}>
        <div className="input-area">
          <label htmlFor="">Nome</label>
          <Input placeholder="Digite o nome do cliente" ref={nameRef} />
          <label htmlFor="">CNPJ</label>
          <Input placeholder="Digite o CNPJ" ref={CnpjRef} />
          <label htmlFor="">Endereço</label>
          <Input placeholder="Digite o endereço" ref={AdressRef} />
          <Button type="submit">Cadastrar</Button>
        </div>
      </form>
    </>
  );
}
