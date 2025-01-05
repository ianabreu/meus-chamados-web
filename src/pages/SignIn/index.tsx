import { useState } from "react";
import { Link } from "react-router-dom";
import LOGO from "../../assets/logo.png";
import "./styles-signin.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={LOGO} alt="Logo do Sistema de Chamados" />
        </div>
        <form>
          <h1>Entrar</h1>
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
          <button type="submit">Acessar</button>
        </form>
        <Link to="/register">Criar uma conta</Link>
      </div>
    </div>
  );
}
