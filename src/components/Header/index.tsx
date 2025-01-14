import avatarPNG from "../../assets/avatar.png";
import { useAuthStore } from "../../store/auth";
import { FiHome, FiUser, FiSettings, FiMenu } from "react-icons/fi";
import "./styles-header.css";
import { Button } from "../Button";
import { useEffect, useState } from "react";
import HeaderLink from "./HeaderLink";
import { useLocation } from "react-router-dom";

export default function Header() {
  const { user } = useAuthStore();
  const [isOpen, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    if (window.innerWidth <= 420) {
      setOpen(false);
    }
  }, [pathname]);
  function toggleMenu() {
    setOpen(!isOpen);
  }
  return (
    <div className="sidebar">
      <div className="sidebar-image-area">
        <img
          src={user?.avatarUrl === null ? avatarPNG : user?.avatarUrl}
          alt="Foto do Usuário"
        />
      </div>
      <div className="menu-toggle">
        <Button className="menu-btn" onClick={toggleMenu}>
          <FiMenu color="#FFF" size={24} />
        </Button>
      </div>
      <nav className={isOpen ? "menu-open" : "menu-close"}>
        <HeaderLink to={"/dashboard"}>
          <FiHome color="#FFF" size={24} />
          Chamados
        </HeaderLink>
        <HeaderLink to={"/customers"}>
          <FiUser color="#FFF" size={24} />
          Clientes
        </HeaderLink>
        <HeaderLink to={"/profile"}>
          <FiSettings color="#FFF" size={24} />
          Perfil
        </HeaderLink>
      </nav>
    </div>
  );
}
