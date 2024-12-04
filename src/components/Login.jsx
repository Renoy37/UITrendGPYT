// react-frontend/src/components/LoginModal.jsx

import React, { useState, useContext } from "react";
import { Eye, EyeOff } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const LoginModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Sign Up
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const { isAuthenticated } = useContext(AuthContext);

  const toggleForm = () => setIsLogin(!isLogin);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLoginWithDeriv = () => {
    console.log("Login with Deriv button clicked"); // Debug log
    const appID = import.meta.env.VITE_DERIV_APP_ID; // Use Vite's env variables
    console.log("Deriv App ID:", appID); // Debug log
    const redirectURI = `${
      import.meta.env.VITE_BACKEND_URL
    }/oauth/auth/callback`; // Flask callback URL
    const scope = "read,trade";
    const derivLoginURL = `https://oauth.binary.com/oauth2/authorize?app_id=${appID}&scope=${scope}&redirect_uri=${encodeURIComponent(
      redirectURI
    )}`;
    console.log("Deriv Login URL:", derivLoginURL); // Debug log
    window.location.href = derivLoginURL; // Redirect user to Deriv's OAuth page
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle traditional login or sign-up if needed
  };

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

        {!isAuthenticated ? (
          // Show message to log in with Deriv first
          <div className="bg-yellow-100 text-yellow-700 p-4 rounded-md mb-4">
            <p className="text-center font-semibold">
              Please log in with Deriv before accessing your account.
            </p>
            <button
              onClick={handleLoginWithDeriv}
              className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
            >
              Log in with Deriv
            </button>
          </div>
        ) : (
          // Show login form if Deriv token exists
          <form className="space-y-4" onSubmit={handleSubmit}>
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
                type={showPassword ? "text" : "password"}
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
        )}

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
