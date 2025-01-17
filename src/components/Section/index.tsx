import { DetailedHTMLProps, HTMLAttributes } from "react";
import "./styles-section.css";
type SectionProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
export default function Section({
  children,
  className,
  ...rest
}: SectionProps) {
  return (
    <section className={`content-section ${className}`} {...rest}>
      {children}
    </section>
  );
}
