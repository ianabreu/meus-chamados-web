import { forwardRef, InputHTMLAttributes } from "react";
import "./styles-input.css";

type InputUIProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputUIProps>(
  ({ className, ...rest }, ref) => {
    return (
      <input className={`defaultInput ${className}`} {...rest} ref={ref} />
    );
  }
);
