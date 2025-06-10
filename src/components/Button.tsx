import { motion } from "framer-motion";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  asMotion?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Button({
  loading,
  asMotion,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "font-normal text-white text-center cursor-pointer transition-transform transition-colors duration-300 no-underline py-3 px-12 rounded-[10px] my-2";
  if (asMotion) {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        className={`${base} ${className}`}
        {...props}
      >
        {loading ? "Loading..." : children}
      </motion.button>
    );
  }
  return (
    <button className={`${base} ${className}`} {...props}>
      {loading ? "Loading..." : children}
    </button>
  );
}
