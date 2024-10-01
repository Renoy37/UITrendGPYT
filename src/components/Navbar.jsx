import React, { useState } from "react";
import { TrendingUp, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State for hamburger menu

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle menu open/close
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
            isOpen ? "block" : "hidden" // Show/hide menu
          }`}
        >
          {["Backtest", "Run Bot", "Strategies", "About"].map((item) => (
            <li key={item} className="md:mr-6 mt-2 md:mt-0">
              <a
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-white hover:text-gray-300 transition duration-300"
                onClick={() => setIsOpen(false)} // Close menu on link click
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
