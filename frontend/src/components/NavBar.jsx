import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext"; // Adjust the import path as necessary
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa"; // Using icons

const NavBar = () => {
  const { user, logoutUser } = useUserContext();
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-400 p-5 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-white text-2xl md:text-4xl font-extrabold tracking-wide hover:opacity-90 transition-opacity duration-300"
        >
          Interactive Data Visualization Dashboard
        </Link>

        <div className="md:hidden flex items-center" onClick={toggleMenu}>
          {isOpen ? (
            <FaTimes className="text-white text-3xl" aria-label="Close menu" />
          ) : (
            <FaBars className="text-white text-3xl" aria-label="Open menu" />
          )}
        </div>

        <div className={`hidden md:flex items-center space-x-6 md:space-x-10`}>
          {user ? (
            <>
              <div className="flex items-center text-white">
                <FaUserCircle className="mr-2 text-3xl" />
                <span className="font-medium text-lg">Hi, {user.name}</span>
              </div>

              <button
                onClick={logoutUser}
                className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-full shadow-md hover:bg-gray-100 transition-transform transform hover:scale-105 duration-300"
                aria-label="Logout"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-full shadow-md hover:bg-gray-100 transition-transform transform hover:scale-105 duration-300"
                aria-label="Register"
              >
                Register
              </Link>

              <Link
                to="/login"
                className="text-white font-semibold hover:underline transition-opacity duration-300"
                aria-label="Login"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden flex flex-col items-center mt-4 space-y-4 transition duration-300 ease-in-out`}
      >
        {user ? (
          <>
            <div className="flex items-center text-white">
              <FaUserCircle className="mr-2 text-3xl" />
              <span className="font-medium text-lg">Hi, {user.name}</span>
            </div>

            <button
              onClick={logoutUser}
              className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-full shadow-md hover:bg-gray-100 transition-transform transform hover:scale-105 duration-300"
              aria-label="Logout"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/register"
              className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-full shadow-md hover:bg-gray-100 transition-transform transform hover:scale-105 duration-300"
              aria-label="Register"
            >
              Register
            </Link>

            <Link
              to="/login"
              className="text-white font-semibold hover:underline transition-opacity duration-300"
              aria-label="Login"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
