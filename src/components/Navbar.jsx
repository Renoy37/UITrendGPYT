import React from "react";
import { TrendingUp } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-purple-700 to-indigo-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-2xl flex items-center">
          <TrendingUp className="mr-2" />
          TrendGYPT
        </div>
        <ul className="flex space-x-6">
          {["Backtest", "Run Bot", "Strategies", "About"].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-white hover:text-gray-300 transition duration-300"
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
