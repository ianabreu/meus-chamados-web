import { ButtonHTMLAttributes, forwardRef } from "react";
import "./styles-button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: "outline" | "filled";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, loading = false, variant = "filled", children, ...rest },
    ref
  ) => {
    return (
      <button
        disabled={loading}
        className={`defaultButton ${variant} ${className}`}
        {...rest}
        ref={ref}
      >
        {loading ? <span>Carregando...</span> : children}
      </button>
    );
  }
);
