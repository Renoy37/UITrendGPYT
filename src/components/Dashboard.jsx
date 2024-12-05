// src/components/Dashboard.jsx

import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { profile, logout } = useContext(AuthContext);

  if (!profile) {
    return <div>Loading profile...</div>;
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
