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
    console.log("Checking authentication status...");
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/profile`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Profile response:", response.data);
        if (response.data && !response.data.error) {
          setIsAuthenticated(true);
          setProfile(response.data);
        } else {
          setIsAuthenticated(false);
          setProfile(null);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Auth check failed:", error);
        setIsAuthenticated(false);
        setProfile(null);
        setLoading(false);
      });
  }, []);

  const logout = () => {
    console.log("Logging out...");
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/oauth/auth/logout`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Logout response:", response.data);
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
