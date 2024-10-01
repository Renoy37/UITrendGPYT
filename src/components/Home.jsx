import React, { useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AlertCircle, BarChart2, Play } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../components/Alert"; // Adjust path as necessary

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const startBacktest = async () => {
    setLoading(true);
    setResult(null);
    setErrorMessage(null);

    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const mockData = {
        analysis: {
          "Trade Analysis Results": {
            "Total Trades": 100,
            "Winning Trades": 65,
            "Win Rate": "65%",
          },
        },
        plot: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==",
      };
      setResult(mockData);
    } catch (error) {
      setErrorMessage(
        "An error occurred during the backtest. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const runBot = () => {
    alert("Run Bot functionality to be implemented!");
  };

  const chartData = [
    { name: "Jan", value: 4000 },
    { name: "Feb", value: 3000 },
    { name: "Mar", value: 5000 },
    { name: "Apr", value: 4500 },
    { name: "May", value: 6000 },
    { name: "Jun", value: 5500 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
        Backtest Your Strategy and Start Your Bot
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Press the button below to run the backtest and optimize your trading
        strategy.
      </p>

      <div className="flex justify-center space-x-4 mb-8">
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 flex items-center"
          onClick={startBacktest}
          disabled={loading}
        >
          <BarChart2 className="mr-2" />
          Start Backtest
        </button>
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 flex items-center"
          onClick={runBot}
          disabled={loading}
        >
          <Play className="mr-2" />
          Run Bot
        </button>
      </div>

      {loading && (
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
          <p className="mt-2 text-gray-600">
            Running the backtest... Please wait!
          </p>
        </div>
      )}

      {errorMessage && (
        <Alert variant="destructive" className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      {result && (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Backtest Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {Object.entries(result.analysis["Trade Analysis Results"]).map(
              ([key, value]) => (
                <div key={key} className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">{key}</p>
                  <p className="text-2xl font-bold text-purple-600">{value}</p>
                </div>
              )
            )}
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Home;
