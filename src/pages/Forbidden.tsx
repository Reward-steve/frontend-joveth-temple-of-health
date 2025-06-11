import React from "react";
import { Link } from "react-router-dom";
import { FaBan } from "react-icons/fa";

const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fff3cd] px-4">
      <FaBan className="text-6xl text-yellow-500 mb-4" />
      <h1 className="text-6xl font-extrabold text-yellow-600 mb-2">403</h1>
      <p className="text-2xl text-yellow-800 mb-6">
        Access Forbidden – You don’t have permission to view this page.
      </p>
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-lg font-semibold transition"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default Forbidden;
