// src/context/AuthContext.jsx

import React, { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export const AuthContext = createContext();

const AUTH_STORAGE_KEY = "gambiai_auth";

const getStoredAuth = () => {
  try {
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    return storedAuth ? JSON.parse(storedAuth) : null;
  } catch (error) {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = getStoredAuth();
    return Boolean(storedAuth?.accessToken || storedAuth?.profile);
  });
  const [profile, setProfile] = useState(() => {
    const storedAuth = getStoredAuth();
    return storedAuth?.profile || null;
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const storedAuth = getStoredAuth();

    if (!storedAuth) {
      return;
    }

    setProfile(storedAuth.profile || {});
    setIsAuthenticated(Boolean(storedAuth.accessToken || storedAuth.profile));
  }, []);

  const login = useCallback(({ accessToken, profile: nextProfile }) => {
    const authData = {
      accessToken,
      profile: nextProfile || {},
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
    setProfile(authData.profile);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
    setProfile(null);
    navigate("/"); // Redirect to homepage after logout
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        profile,
        login,
        logout,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
