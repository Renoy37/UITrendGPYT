// File: components/Navbar.js
import React, { useState } from "react";
import { TrendingUp, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom"; // Use NavLink for active link styling
import LoginModal from "./Login";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu
  const [showLoginModal, setShowLoginModal] = useState(false); // State for modal

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
          className={`md:flex md:items-center w-full md:w-auto transition-all duration-300 ease-in-out ${
            isOpen ? "block" : "hidden"
          }`}
        >
          {["Home", "Strategies", "Run Bot", "About"].map((item) => (
            <li key={item} className="md:mr-6 mt-2 md:mt-0">
              <NavLink
                to={
                  item === "Home"
                    ? "/"
                    : `/${item.toLowerCase().replace(" ", "-")}`
                }
                className={({ isActive }) =>
                  `text-white hover:text-gray-300 transition duration-300 ${
                    isActive ? "text-yellow-300 font-semibold" : ""
                  }`
                }
                onClick={() => setIsOpen(false)} // Close menu on link click in mobile
              >
                {item}
              </NavLink>
            </li>
          ))}
          {/* Log In Button */}
          <li className="md:mr-6 mt-2 md:mt-0">
            <button
              onClick={toggleLoginModal}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Log In
            </button>
          </li>
        </ul>
      </div>

      {/* Display Login Modal if toggled */}
      {showLoginModal && <LoginModal onClose={toggleLoginModal} />}
    </nav>
  );
};

export default Navbar;
