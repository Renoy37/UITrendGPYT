// File: components/RunBot.js
import React from "react";
import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const RunBot = () => {
  return (
    <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-12">
      <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-6 rounded-lg shadow-md flex items-center space-x-4">
        <AlertCircle className="text-yellow-500" size={32} />
        <div>
          <h2 className="text-2xl font-semibold">Access Restricted</h2>
          <p className="mt-2">
            You need to{" "}
            <Link
              to="/"
              className="text-purple-700 font-semibold hover:underline"
            >
              Log In
            </Link>{" "}
            to access this page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RunBot;
