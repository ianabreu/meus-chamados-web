import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { ReactNode, useEffect } from "react";
import Header from "../components/Header";
import "./styles-private.css";

interface PrivateProps {
  children: ReactNode;
}
const pathNames: { [key: string]: string } = {
  "/": "Login",
  "/register": "Cadastro",
  "/dashboard": "Painel",
  "/profile": "Perfil",
  "/customers": "Clientes",
};
export default function Private({ children }: PrivateProps) {
  const { signed, loadingAuth } = useAuthStore();
  const { pathname } = useLocation();

  const pageTitle = pathNames[pathname];

  useEffect(() => {
    document.title = `Meus Chamados - ${pageTitle}`;
  }, [pageTitle]);

  const publicRoutes = ["/", "/register"];

  if (loadingAuth) {
    return null;
  } else {
    if (!signed) {
      if (publicRoutes.includes(pathname)) {
        return children;
      } else {
        return <Navigate to={"/"} replace={true} />;
      }
    } else {
      if (publicRoutes.includes(pathname)) {
        return <Navigate to={"/dashboard"} replace={true} />;
      } else {
        return (
          <div className="container">
            <div className="sidebar">
              <Header />
            </div>
            <main className="content">{children}</main>
          </div>
        );
      }
    }
  }
}
