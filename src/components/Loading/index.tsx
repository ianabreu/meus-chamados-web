import { FiLoader } from "react-icons/fi";
import "./styles-loading.css";
import Section from "../Section";

export function Loading({ message = "Carregando" }: { message?: string }) {
  return (
    <Section>
      <div className="loading">
        <FiLoader className="icon spinner" />
        {message}
      </div>
    </Section>
  );
}
