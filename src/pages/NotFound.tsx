import React from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f0f4ff] px-4">
      <FaExclamationTriangle className="text-6xl text-red-400 mb-4" />
      <h1 className="text-6xl font-extrabold text-red-500 mb-2">404</h1>
      <p className="text-2xl text-gray-700 mb-6">Page Not Found</p>
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-lg font-semibold transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
