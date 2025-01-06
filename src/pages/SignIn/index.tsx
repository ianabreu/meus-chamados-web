import { FormEvent, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import LOGO from "../../assets/logo.png";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import "./styles-signin.css";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/auth";

export default function SignIn() {
  const { signIn, loadingAuth } = useAuthStore();
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const email = emailRef.current?.value as string;
    const password = passwordRef.current?.value as string;

    if (email === "" || password === "") {
      toast.error("Preencha todos os campos");
      emailRef.current?.focus();
      return;
    }
    try {
      await signIn({ email, password });
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Erro ao logar");
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
          <h1>Entrar</h1>
          <Input type="email" placeholder="email@email.com" ref={emailRef} />
          <Input type="password" placeholder="******" ref={passwordRef} />
          <Button loading={loadingAuth} type="submit">
            Acessar
          </Button>
        </form>
        <Link to="/register">Criar uma conta</Link>
      </div>
    </div>
  );
}
