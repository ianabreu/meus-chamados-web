import { useState } from "react";
import { Link } from "react-router-dom";
import LOGO from "../../assets/logo.png";
import "../SignIn/styles-signin.css";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={LOGO} alt="Logo do Sistema de Chamados" />
        </div>
        <form>
          <h1>Nova Conta</h1>
          <input
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="email@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Cadastrar</button>
        </form>
        <Link to="/">Já possui uma conta?</Link>
      </div>
    </div>
  );
}
