import { SelectHTMLAttributes } from "react";
import "./styles-select.css";
interface SelectProps<T> extends SelectHTMLAttributes<HTMLSelectElement> {
  options: T[];
  label?: string;
  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string | number;
  error?: string;
}

export const Select = <T,>({
  options,
  label = "Selecione uma opcão",
  getOptionLabel,
  getOptionValue,
  id,
  error,
  className,
  ...rest
}: SelectProps<T>) => {
  return (
    <div className="select-content">
      <label htmlFor={id} className="select-label">
        {label}
      </label>
      <select
        id={id}
        className={`select-area ${error ? "container-error" : ""} ${className}`}
        {...rest}
      >
        <option value={""} className="select-option" disabled>
          -- Selecione uma opção --
        </option>
        {options.map((option, index) => (
          <option
            key={index}
            value={getOptionValue(option)}
            className="select-option"
          >
            {getOptionLabel(option)}
          </option>
        ))}
      </select>
      {error && <span className="error">{error}</span>}
    </div>
  );
};
