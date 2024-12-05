// react-frontend/src/context/AuthContext.jsx

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component to wrap around the app
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Function to extract token from URL
    const extractTokenFromURL = () => {
      const params = new URLSearchParams(location.search);
      const token = params.get("token");
      if (token) {
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
        // Remove token from URL
        window.history.replaceState({}, document.title, "/dashboard");
        return token;
      }
      return null;
    };

    // Function to fetch user profile
    const fetchProfile = async (token) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setProfile(response.data);
        setIsAuthenticated(true);
        setLoading(false);
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuthenticated(false);
        setProfile(null);
        setLoading(false);
      }
    };

    // Main authentication flow
    const authenticate = () => {
      const tokenFromURL = extractTokenFromURL();
      const token = tokenFromURL || localStorage.getItem("token");

      if (token) {
        fetchProfile(token);
      } else {
        setLoading(false);
      }
    };

    authenticate();
  }, [location.search]);

  // Logout function
  const logout = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/oauth/auth/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      setProfile(null);
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
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
