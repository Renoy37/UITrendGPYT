// src/components/Navbar.js

import React, { useState, useContext } from "react";
import { TrendingUp, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import LoginModal from "./Login";
import { AuthContext } from "../context/AuthContext.jsx";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu
  const [showLoginModal, setShowLoginModal] = useState(false); // State for modal
  const { isAuthenticated, logout } = useContext(AuthContext); // Get auth state

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleLoginModal = () => setShowLoginModal(!showLoginModal);

  return (
    <nav className="bg-gradient-to-r from-purple-700 to-indigo-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-white font-bold text-2xl flex items-center"
        >
          <TrendingUp className="mr-2" />
          TrendGYPT
        </NavLink>

        {/* Hamburger icon for mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navigation Links */}
        <ul
          className={`md:flex md:items-center md:space-x-6 w-full md:w-auto absolute md:static top-16 left-0 md:top-auto md:left-auto bg-gradient-to-r from-purple-700 to-indigo-800 md:bg-transparent z-20 transition-all duration-300 ease-in-out ${
            isOpen ? "block" : "hidden"
          }`}
        >
          {["Home", "Strategies", "Run Bot", "About"].map((item) => (
            <li key={item} className="text-center md:text-left py-2 md:py-0">
              <NavLink
                to={
                  item === "Home"
                    ? "/"
                    : `/${item.toLowerCase().replace(" ", "-")}`
                }
                className={({ isActive }) =>
                  `block text-white hover:text-gray-300 transition duration-300 px-4 py-2 rounded-md ${
                    isActive ? "text-yellow-300 font-semibold" : ""
                  }`
                }
                onClick={() => setIsOpen(false)} // Close menu on link click in mobile
              >
                {item}
              </NavLink>
            </li>
          ))}

          {isAuthenticated ? (
            <>
              {/* Dashboard Link */}
              <li className="text-center md:text-left py-2 md:py-0">
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `block text-white hover:text-gray-300 transition duration-300 px-4 py-2 rounded-md ${
                      isActive ? "text-yellow-300 font-semibold" : ""
                    }`
                  }
                  onClick={() => setIsOpen(false)} // Close menu on link click in mobile
                >
                  Dashboard
                </NavLink>
              </li>

              {/* Log Out Button */}
              <li className="text-center py-2 md:py-0">
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false); // Close menu on logout
                  }}
                  className="block bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md w-full md:w-auto"
                >
                  Log Out
                </button>
              </li>
            </>
          ) : (
            // Log In Button
            <li className="text-center py-2 md:py-0">
              <button
                onClick={() => {
                  toggleLoginModal();
                  setIsOpen(false); // Close menu when opening login modal
                }}
                className="block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md w-full md:w-auto"
              >
                Log In
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* Display Login Modal if toggled */}
      {showLoginModal && <LoginModal onClose={toggleLoginModal} />}
    </nav>
  );
};

export default Navbar;
