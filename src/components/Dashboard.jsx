// src/components/Dashboard.jsx

import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

const Dashboard = () => {
  const { profile, logout, isAuthenticated, loading } = useContext(AuthContext);

  console.log("Dashboard - isAuthenticated:", isAuthenticated);
  console.log("Dashboard - profile:", profile);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading profile...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Please log in to view your dashboard.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Welcome, {profile.fullname || "User"}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
            <p>
              <span className="font-medium">Full Name:</span>{" "}
              {profile.fullname || "N/A"}
            </p>
            <p>
              <span className="font-medium">Email:</span>{" "}
              {profile.email || "N/A"}
            </p>
            <p>
              <span className="font-medium">Login ID:</span>{" "}
              {profile.loginid || "N/A"}
            </p>
            <p>
              <span className="font-medium">Client ID:</span>{" "}
              {profile.client_id || "N/A"}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Account Details</h2>
            <p>
              <span className="font-medium">Currency:</span>{" "}
              {profile.currency || "N/A"}
            </p>
            <p>
              <span className="font-medium">Balance:</span>{" "}
              {profile.balance !== undefined ? profile.balance : "N/A"}{" "}
              {profile.currency || ""}
            </p>
            <p>
              <span className="font-medium">Country:</span>{" "}
              {profile.country || "N/A"}
            </p>
            <p>
              <span className="font-medium">Affiliate Token:</span>{" "}
              {profile.affiliate_token || "N/A"}
            </p>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
