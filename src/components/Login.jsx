// File: components/LoginModal.js
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Import icons for password toggle

const LoginModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Sign Up
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  const toggleForm = () => setIsLogin(!isLogin);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white rounded-lg p-8 shadow-lg w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-transform transform hover:scale-110 focus:outline-none"
        >
          <span className="text-2xl font-bold">&times;</span>
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          {isLogin ? "Log In" : "Sign Up"}
        </h2>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          )}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"} // Toggle password visibility
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-md"
          >
            {isLogin ? "Log In" : "Sign Up"}
          </button>
        </form>

        {/* Toggle between Login and Sign Up */}
        <p className="text-center text-gray-600 mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={toggleForm}
            className="text-purple-700 hover:text-purple-800 font-semibold"
          >
            {isLogin ? "Sign Up" : "Log In"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
