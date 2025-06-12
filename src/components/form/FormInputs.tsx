import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
import { type FormInputProps } from "../../types/auth";

export default function FormInput({
  id,
  maxLength,
  type = "text",
  label,
  placeholder,
  icon: Icon,
  register,
  error,
  required,
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  // Determine the input type based on whether it's a password and if it should be shown
  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1 w-full mb-2">
      {label && (
        <label htmlFor={id} className="font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-600">*</span>}
        </label>
      )}
      <div className="relative">
        {/* Left icon: always show if Icon is provided */}
        {Icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-light-secondary">
            <Icon />
          </span>
        )}
        <input
          id={id}
          maxLength={maxLength}
          type={inputType}
          placeholder={placeholder}
          className={`w-full ${Icon ? "pl-9" : "pl-4"} ${
            type === "password" ? "pr-10" : "pr-4"
          } py-2 rounded-md outline-light-primary ${
            error
              ? "border border-error focus:outline-error animate-shake"
              : "border border-light-secondary"
          }`}
          {...register}
        />
        {/* Password toggle icon: only show for password fields */}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-light-secondary focus:outline-none"
            tabIndex={-1}
          >
            {showPassword ? (
              <FaEyeSlash className="h-5 w-5" />
            ) : (
              <FaEye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
      {error && (
        <p className="flex items-center gap-2 text-error text-sm mt-1 animate-shake">
          <FaInfoCircle size={16} />
          {"message" in error ? (error as { message?: string }).message : ""}
        </p>
      )}
    </div>
  );
}
