// src/components/Dashboard.jsx

import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

const Dashboard = () => {
  const { profile, logout, isAuthenticated, loading } = useContext(AuthContext);

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
              <strong>Full Name:</strong> {profile.fullname || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {profile.email || "N/A"}
            </p>
            <p>
              <strong>Login ID:</strong> {profile.loginid || "N/A"}
            </p>
            <p>
              <strong>Client ID:</strong> {profile.client_id || "N/A"}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Account Details</h2>
            <p>
              <strong>Currency:</strong> {profile.currency || "N/A"}
            </p>
            <p>
              <strong>Balance:</strong>{" "}
              {profile.balance !== undefined ? profile.balance : "N/A"}{" "}
              {profile.currency || ""}
            </p>
            <p>
              <strong>Country:</strong> {profile.country || "N/A"}
            </p>
            <p>
              <strong>Affiliate Token:</strong>{" "}
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
