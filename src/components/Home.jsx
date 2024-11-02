// File: components/Home.js
import React, { useState } from "react";
import BacktestResults from "./BacktestResults.jsx";
import HomePageContent from "./HomePageContent";

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
        <HomePageContent startBacktest={startBacktest} loading={loading} />
      )}
    </div>
  );
};

export default Home;
