// src/context/AuthContext.jsx

import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const logout = () => {
    setIsAuthenticated(false);
    setProfile(null);
    navigate("/"); // Redirect to homepage after logout
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        profile,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
