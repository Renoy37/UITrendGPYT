// src/components/LoginModal.jsx

import React, { useState, useContext, useEffect, useCallback } from "react";
import { Eye, EyeOff } from "lucide-react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const DERIV_AUTH_URL = "https://oauth.deriv.com/oauth2/authorize";
const DERIV_CLIENT_ID = "63393";

const LoginModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { isAuthenticated, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleForm = () => setIsLogin(!isLogin);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const closeLoginModal = useCallback(() => {
    if (typeof onClose === "function") {
      onClose();
    } else {
      navigate("/");
    }
  }, [navigate, onClose]);

  const handleLoginWithTradingAccount = () => {
    const appID =
      import.meta.env.VITE_DERIV_APP_ID ||
      import.meta.env.VITE_DERIV_CLIENT_ID ||
      DERIV_CLIENT_ID;
    const loginParams = new URLSearchParams({
      app_id: appID,
    });

    sessionStorage.setItem("oauth_return_to", "/run-bot");

    window.location.href = `${DERIV_AUTH_URL}?${loginParams.toString()}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Traditional login/sign-up submitted");
    // Implement traditional login/sign-up logic if needed
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/run-bot");
      closeLoginModal(); // Close the modal after navigation
    }
  }, [isAuthenticated, navigate, closeLoginModal]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-950 bg-opacity-70 z-50">
      <div className="relative bg-white rounded-lg p-8 shadow-xl w-full max-w-md border border-slate-200">
        {/* 'X' Button to Close the Modal */}
        <button
          onClick={closeLoginModal}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 transition-transform transform hover:scale-110 focus:outline-none"
          aria-label="Close Login Modal"
        >
          <span className="text-2xl font-bold">&times;</span>
        </button>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 text-center">
          {isLogin ? "Log In" : "Sign Up"}
        </h2>

        {loading ? (
          <div className="flex justify-center">
            <div>Loading...</div>
          </div>
        ) : !isAuthenticated ? (
          // Show message to connect a trading account
          <div className="bg-amber-50 text-amber-800 border border-amber-200 p-4 rounded-md mb-4">
            <p className="text-center font-semibold">
              Please connect a trading account before accessing your account.
            </p>
            <button
              onClick={handleLoginWithTradingAccount}
              className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Connect Trading Account
            </button>
          </div>
        ) : (
          // Show login form if already authenticated (optional)
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Username
              </label>
              <input
                type="text"
                className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
            )}
            <div className="relative">
              <label className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-9 text-slate-500 hover:text-slate-700 focus:outline-none"
                aria-label={showPassword ? "Hide Password" : "Show Password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-md"
            >
              {isLogin ? "Log In" : "Sign Up"}
            </button>
          </form>
        )}

        <p className="text-center text-slate-600 mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={toggleForm}
            className="text-emerald-700 hover:text-emerald-800 font-semibold"
          >
            {isLogin ? "Sign Up" : "Log In"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
