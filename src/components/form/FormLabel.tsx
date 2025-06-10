import React from "react";

export function FormLabel({
  htmlFor,
  label,
  error,
  required = false,
  children,
}: {
  htmlFor: string;
  label: string;
  error?: string;
  required?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 w-full mb-2">
      <label htmlFor={htmlFor} className="font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-2 text-red-600 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
