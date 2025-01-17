import { ReactNode } from "react";
import "./styles-title.css";
import Section from "../Section";
interface TitleProps {
  children?: ReactNode;
  icon?: ReactNode;
}
export default function Title({ children, icon }: TitleProps) {
  return (
    <Section className="title">
      {icon}
      <span>{children}</span>
    </Section>
  );
}
