import React, { FormEvent } from "react";
import { FaHome } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";
import style from "../../styles/Authpages.module.css";
import { Input } from "../Inputs";
import { TogglePassword } from "../TogglePassword";
import { LoginType, ValidationErrors } from "./types";
import { RiLoader2Line } from "react-icons/ri";

interface Props {
  next: boolean;
  error?: string | null;
  isLoading: boolean;
  currentUser: LoginType;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUserLogin: (e: FormEvent) => void;
  handlePasswordReset: () => void;
  setNext: React.Dispatch<React.SetStateAction<boolean>>;
  validateErrors: ValidationErrors;
}

export const LoginForm = ({
  next,
  isLoading,
  currentUser,
  handleInputChange,
  handleUserLogin,
  handlePasswordReset,
  setNext,
  validateErrors,
}: Props) => {
  return (
    <form className={style.loginForm} onSubmit={(e) => e.preventDefault()}>
      <div className={style.iconholder}>
        <h3>{next ? "Forgotten Password" : "Log in"}</h3>
        <Link to="/" className={style.homeIcon}>
          <FaHome size={20} />
        </Link>
      </div>

      <div className={style.authSection}>
        <label>
          <Input
            nameTitle="Email Address"
            type="email"
            name="email"
            value={currentUser.email}
            placeholder="ayojackson@example.com"
            change={handleInputChange}
            errorMessage={validateErrors.email}
          />
        </label>

        {!next && (
          <label>
            <TogglePassword
              password={currentUser.password}
              change={handleInputChange}
              errorMessage={validateErrors.password}
            />
          </label>
        )}

        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className={`${style.navlink} no-underline ${
            isLoading ? "bg-[#1e9eb2]" : "bg-[#1e9ef4]"
          } transition-colors`}
          onClick={next ? handlePasswordReset : handleUserLogin}
        >
          {isLoading ? (
            <RiLoader2Line size={30} />
          ) : next ? (
            "Reset Password"
          ) : (
            "Login"
          )}
        </motion.button>
      </div>

      <label className={style.bottomText}>
        <p
          onClick={() => setNext(!next)}
          className="text-blue-700 w-[95%] p-2.5 flex justify-end cursor-pointer"
        >
          {next ? "Back to Login" : "Forgotten password?"}
        </p>
      </label>

      <label className={style.bottomText}>
        <p>Need an account?</p>
        <NavLink className="text-blue-600" to="/auth/signup">
          Sign up
        </NavLink>
      </label>
    </form>
  );
};
