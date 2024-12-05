// react-frontend/src/context/AuthContext.jsx

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
          console.log("User authenticated and profile set.");
        } else {
          setIsAuthenticated(false);
          setProfile(null);
          console.log("Authentication failed. Profile cleared.");
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
        // Optionally, redirect to login or home page
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
