// react-frontend/src/components/Dashboard.jsx

import React, { useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { profile, setProfile, logout } = useContext(AuthContext);

  useEffect(() => {
    if (!profile) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/profile`, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data && !response.data.error) {
            setProfile(response.data);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch profile:", error);
        });
    }
  }, [profile, setProfile]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">
        Welcome, {profile.fullname || "User"}
      </h1>
      <p>Email: {profile.email}</p>
      <p>Currency: {profile.currency}</p>
      {/* Display other profile information as needed */}
      <button
        onClick={logout}
        className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
