// react-frontend/src/context/AuthContext.jsx

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true); // To handle loading state

  useEffect(() => {
    // Check authentication status on component mount
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/profile`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data && !response.data.error) {
          setIsAuthenticated(true);
          setProfile(response.data);
        } else {
          setIsAuthenticated(false);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Auth check failed:", error);
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);

  const logout = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/oauth/auth/logout`, {
        withCredentials: true,
      })
      .then((response) => {
        setIsAuthenticated(false);
        setProfile(null);
        // Optionally, redirect to home or login page
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        profile,
        setIsAuthenticated,
        setProfile,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
