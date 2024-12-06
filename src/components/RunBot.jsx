// src/components/RunBot.js
import React, { useContext } from "react";
import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const RunBot = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-6 rounded-lg shadow-md flex items-center space-x-4">
          <AlertCircle className="text-yellow-500" size={32} />
          <div>
            <h2 className="text-2xl font-semibold">Access Restricted</h2>
            <p className="mt-2">
              You need to{" "}
              <Link
                to="/login"
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
  }

  // If authenticated, display the bot cards
  return (
    <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Available Trading Bots
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Bot Card 1 */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-4">Scalping Bot</h3>
            <p className="text-gray-600">
              A high-frequency trading bot designed for quick profits from small
              price changes.
            </p>
          </div>
          <button className="mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md">
            Activate
          </button>
        </div>

        {/* Bot Card 2 */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-4">Swing Trading Bot</h3>
            <p className="text-gray-600">
              Optimizes trades over days or weeks, capitalizing on market swings
              and trends.
            </p>
          </div>
          <button className="mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md">
            Activate
          </button>
        </div>

        {/* Bot Card 3 */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-4">Arbitrage Bot</h3>
            <p className="text-gray-600">
              Identifies and exploits price discrepancies across different
              markets or exchanges.
            </p>
          </div>
          <button className="mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md">
            Activate
          </button>
        </div>
      </div>
    </div>
  );
};

export default RunBot;
