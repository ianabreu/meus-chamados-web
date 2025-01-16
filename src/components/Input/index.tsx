import { forwardRef, InputHTMLAttributes } from "react";
import "./styles-input.css";

type InputUIProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  label?: string;
  mask?: (value: string) => string;
};

export const Input = forwardRef<HTMLInputElement, InputUIProps>(
  ({ label, error, id, mask, className, ...rest }, ref) => {
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (mask) {
        event.target.value = mask(event.target.value);
      }
    };
    return (
      <div className="input-area-content">
        {label && (
          <label className="label" htmlFor={id}>
            {label}
          </label>
        )}
        <input
          className={`defaultInput ${className} ${error ? "error" : ""}`}
          ref={ref}
          id={id}
          onInput={handleInput}
          {...rest}
        />
        {error && <p className="text-error">{error}</p>}
      </div>
    );
  }
);
