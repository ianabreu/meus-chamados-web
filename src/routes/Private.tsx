import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { ReactNode } from "react";

interface PrivateProps {
  children: ReactNode;
}
export default function Private({ children }: PrivateProps) {
  const { signed } = useAuthStore();

  if (!signed) {
    return <Navigate to={"/"} />;
  }
  return children;
}
