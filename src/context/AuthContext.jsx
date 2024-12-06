import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const extractTokenFromURL = () => {
      const params = new URLSearchParams(location.search);
      const token = params.get("token");
      if (token) {
        console.log("Token extracted from URL:", token); // Debugging
        localStorage.setItem("token", token);
        // Remove token from URL
        window.history.replaceState({}, document.title, "/dashboard");
        return token;
      }
      return null;
    };

    const fetchProfile = async (token) => {
      try {
        console.log("Fetching profile with token:", token); // Debugging
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Profile fetched successfully:", response.data); // Debugging
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

  const logout = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/oauth/auth/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Logged out successfully.");
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      setProfile(null);
      navigate("/login");
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
