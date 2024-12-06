// src/context/AuthContext.jsx

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/profile`,
          { withCredentials: true }
        );
        setProfile(response.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Not authenticated:", error);
        setIsAuthenticated(false);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  const logout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/oauth/auth/logout`, {
        withCredentials: true,
      });
      setIsAuthenticated(false);
      setProfile(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
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
