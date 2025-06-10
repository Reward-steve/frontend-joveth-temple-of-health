import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export function FormHeader({ title }: { title: string }) {
  return (
    <header className="w-[90%] flex justify-between items-center">
      <h3 className="text-[#1e3a5f] font-bold text-2xl py-8">{title}</h3>
      <Link
        to="/"
        className="p-2 rounded-full text-white bg-[#1e3a5f] flex justify-center items-center transition-transform transition-colors duration-300 hover:scale-105 hover:text-[#1e3a5f] hover:bg-white hover:border hover:border-[#1e3a5f]"
      >
        <FaHome className="text-2xl" />
      </Link>
    </header>
  );
}
