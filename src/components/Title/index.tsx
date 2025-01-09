import { ReactNode } from "react";
import "./styles-title.css";
interface TitleProps {
  children?: ReactNode;
  icon?: ReactNode;
}
export default function Title({ children, icon }: TitleProps) {
  return (
    <div className="title">
      {icon}
      <span>{children}</span>
    </div>
  );
}
