import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { TrendingUp, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-700 to-indigo-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        <div className="text-white font-bold text-2xl flex items-center">
          <TrendingUp className="mr-2" />
          TrendGYPT
        </div>

        {/* Hamburger icon */}
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
          <li className="md:mr-6 mt-2 md:mt-0">
            <NavLink
              to="/" // Link to Home page
              className={({ isActive }) =>
                `text-white hover:text-gray-300 transition duration-300 ${
                  isActive ? "text-yellow-400" : ""
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Run Bot
            </NavLink>
          </li>

          <li className="md:mr-6 mt-2 md:mt-0">
            <NavLink
              to="/strategies" // Link to Strategies/Backtest page
              className={({ isActive }) =>
                `text-white hover:text-gray-300 transition duration-300 ${
                  isActive ? "text-yellow-400" : ""
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Strategies
            </NavLink>
          </li>

          <li className="md:mr-6 mt-2 md:mt-0">
            <NavLink
              to="/backtest" // Link to StrategiesPage via /backtest
              className={({ isActive }) =>
                `text-white hover:text-gray-300 transition duration-300 ${
                  isActive ? "text-yellow-400" : ""
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Backtest
            </NavLink>
          </li>

          <li className="md:mr-6 mt-2 md:mt-0">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-white hover:text-gray-300 transition duration-300 ${
                  isActive ? "text-yellow-400" : ""
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              About
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
