import React from "react";

interface FormHeaderSectionProps {
  icon?: React.ReactNode;
  title?: string;
  message?: string;
}

export function FormHeaderSection({
  icon,
  title,
  message,
}: FormHeaderSectionProps) {
  return (
    <div className="flex flex-col items-center mb-4">
      {icon && <span className="mb-2 animate-bounce">{icon}</span>}
      <h2 className="text-2xl font-bold mb-1 text-[#1e3a5f]">{title}</h2>
      {message && <p className="text-gray-600 text-center">{message}</p>}
    </div>
  );
}
