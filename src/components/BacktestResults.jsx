// File: components/BacktestResults.js
import React from "react";
import { X } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BacktestResults = ({ loading, result, onExit }) => {
  return (
    <div className="relative bg-gray-100 rounded-lg shadow-lg p-8">
      <button
        onClick={onExit}
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition"
      >
        <X size={24} />
      </button>
      {loading ? (
        <div className="flex flex-col items-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          <p className="mt-4 text-gray-600">
            Running the backtest... Please wait!
          </p>
        </div>
      ) : (
        <>
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Backtest Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {Object.entries(result.analysis["Trade Analysis Results"]).map(
              ([key, value]) => (
                <div
                  key={key}
                  className="bg-gray-50 rounded-lg p-4 transition-transform hover:scale-105"
                >
                  <p className="text-sm text-gray-600 mb-1">{key}</p>
                  <p className="text-2xl font-bold text-purple-600">{value}</p>
                </div>
              )
            )}
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Performance Over Time
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={result.performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "0.5rem",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#9333ea"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default BacktestResults;
