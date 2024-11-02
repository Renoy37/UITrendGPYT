import React, { useState } from "react";
import { BarChart2, Play } from "lucide-react";
import BacktestResults from "./BacktestResults.jsx";
import { Link } from "react-router-dom"; 
import { X } from "lucide-react";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [backtestView, setBacktestView] = useState(false);
  const [result, setResult] = useState(null);

  const startBacktest = () => {
    setLoading(true);
    setBacktestView(true);

    // Simulate backtest data and loading
    setTimeout(() => {
      const mockData = {
        analysis: {
          "Trade Analysis Results": {
            "Total Trades": 100,
            "Winning Trades": 65,
            "Win Rate": "65%",
            "Average Profit": "$248.32",
            "Average Loss": "-$124.15",
            "Profit Factor": "2.14",
          },
        },
        performanceData: [
          { date: "2024-01", value: 10000, drawdown: -2 },
          { date: "2024-02", value: 11200, drawdown: -1 },
          { date: "2024-03", value: 10800, drawdown: -4 },
          { date: "2024-04", value: 12400, drawdown: -1 },
          { date: "2024-05", value: 13600, drawdown: -3 },
          { date: "2024-06", value: 15000, drawdown: -2 },
        ],
      };
      setResult(mockData);
      setLoading(false);
    }, 2000);
  };

  const exitBacktest = () => {
    setBacktestView(false);
    setResult(null);
  };

  return (
    <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-12">
      {backtestView ? (
        <BacktestResults
          loading={loading}
          result={result}
          onExit={exitBacktest}
        />
      ) : (
        <>
          <section className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Welcome to <span className="text-purple-700">TrendGYPT</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Dive into the world of algorithmic trading with expertly crafted
              bots for crypto and forex markets. Buy or rent, monitor
              performance, and optimize your strategies—all in one platform.
            </p>
            <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mb-12">
              <button
                onClick={startBacktest}
                className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center transition duration-300"
                disabled={loading}
              >
                <BarChart2 className="mr-2" />
                {loading ? "Running Backtest..." : "Start Backtest"}
              </button>
              <Link
                to="/strategies" // Use Link for client-side navigation
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center transition duration-300"
              >
                <Play className="mr-2" />
                Explore Bots
              </Link>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
              Why Choose TrendGYPT?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6 bg-gray-50 rounded-lg shadow-lg hover:shadow-xl transition-all">
                <BarChart2 className="text-purple-700 mb-4" size={48} />
                <h3 className="text-xl font-bold text-gray-700">
                  Comprehensive Analytics
                </h3>
                <p className="text-gray-600">
                  Real-time performance metrics give you the insights needed to
                  make data-driven decisions.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg shadow-lg hover:shadow-xl transition-all">
                <Play className="text-purple-700 mb-4" size={48} />
                <h3 className="text-xl font-bold text-gray-700">
                  Advanced Algorithmic Bots
                </h3>
                <p className="text-gray-600">
                  Access trading bots optimized for crypto and forex, ready for
                  purchase or rental.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg shadow-lg hover:shadow-xl transition-all">
                <X className="text-purple-700 mb-4" size={48} />
                <h3 className="text-xl font-bold text-gray-700">
                  User-Friendly Design
                </h3>
                <p className="text-gray-600">
                  An intuitive interface to easily monitor, manage, and optimize
                  your trading strategies.
                </p>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Home;
