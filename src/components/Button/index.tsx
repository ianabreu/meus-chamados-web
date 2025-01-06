import { ButtonHTMLAttributes, forwardRef } from "react";
import "./styles-button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, loading = false, children, ...rest }, ref) => {
    return (
      <button
        disabled={loading}
        className={`defaultButton ${className}`}
        {...rest}
        ref={ref}
      >
        {loading ? <span>Carregando...</span> : children}
      </button>
    );
  }
);
