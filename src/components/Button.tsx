import React from "react";
import { RiLoader2Line } from "react-icons/ri";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Button({
  loading,
  type,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  const base =
    "py-2.5 my-2 duration-300 no-underline text-white text-center cursor-pointer flex justify-center items-center transition-colors bg-light-primary rounded-xl transition hover:bg-dark-primary";
  return (
    <button
      type={type}
      disabled={loading}
      className={`${base} ${className}`}
      {...rest}
    >
      {loading ? (
        <RiLoader2Line className="animate-spin" size={24} />
      ) : (
        children
      )}
    </button>
  );
}
