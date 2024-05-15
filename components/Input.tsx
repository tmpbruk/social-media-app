import React from "react";

interface InputProps {
  placeholder?: string;
  value?: string;
  id?: string;
  type?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  required?: boolean;
}
export const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  id,
  type,
  disabled,
  onChange,
  maxLength,
  required,
}) => {
  return (
    <input
      id={id}
      required={required}
      maxLength={maxLength}
      value={value}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
      className="
        w-full
        p-4
        text-lg
        bg-black
        border-2
        border-neutral-800
        rounded-md
        outline-none
        text-white
        focus:border-sky-500
        focus:border-2
        transition
        disabled:bg-neutral-900
        disabled:opacity-70
        disabled:cursor-not-allowed
      "
    />
  );
};
