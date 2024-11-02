import React, { useState, useEffect } from "react";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";
import {
  Bitcoin,
  TrendingUp,
  Clock,
  AlertCircle,
  ArrowUpCircle,
  ArrowDownCircle,
  Activity,
} from "lucide-react";

const StrategyCard = ({ strategy }) => {
  // Simulate live data updates
  const [performance, setPerformance] = useState(strategy.performance);

  useEffect(() => {
    const interval = setInterval(() => {
      setPerformance((prev) => {
        const lastValue = prev[prev.length - 1].value;
        const newValue = lastValue * (1 + (Math.random() - 0.5) * 0.02);
        const newData = [
          ...prev.slice(1),
          { time: new Date().getTime(), value: newValue },
        ];
        return newData;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-102 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${strategy.bgColor}`}>
            {strategy.icon}
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800">{strategy.name}</h3>
            <p className="text-sm text-gray-500">{strategy.pairs}</p>
          </div>
        </div>
        <div
          className={`px-3 py-1 rounded-full text-sm ${
            strategy.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {strategy.status}
        </div>
      </div>

      <div className="h-24 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={performance}>
            <YAxis domain={["dataMin", "dataMax"]} hide />
            <Line
              type="monotone"
              dataKey="value"
              stroke={strategy.lineColor}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm text-gray-600">24h Profit</p>
          <p className={`text-lg font-bold ${strategy.profitClass}`}>
            {strategy.profit}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm text-gray-600">Win Rate</p>
          <p className="text-lg font-bold text-gray-800">{strategy.winRate}</p>
        </div>
      </div>

      <div className="flex justify-between text-sm text-gray-500 border-t pt-4">
        <div className="flex items-center">
          <Clock size={16} className="mr-1" />
          {strategy.timeframe}
        </div>
        <div className="flex items-center">
          <Activity size={16} className="mr-1" />
          {strategy.trades} trades
        </div>
        <div className="flex items-center">
          <AlertCircle size={16} className="mr-1" />
          Risk: {strategy.risk}
        </div>
      </div>
    </div>
  );
};

const StrategiesPage = () => {
  const strategies = [
    {
      name: "BTC Momentum",
      pairs: "BTC/USDT",
      status: "Active",
      icon: <Bitcoin className="text-white" size={24} />,
      bgColor: "bg-orange-500",
      lineColor: "#f97316",
      profit: "+5.8%",
      profitClass: "text-green-600",
      winRate: "67%",
      timeframe: "4h",
      trades: "142",
      risk: "Medium",
      performance: Array(20)
        .fill(0)
        .map((_, i) => ({
          time: i,
          value: 100 + Math.random() * 20,
        })),
    },
    {
      name: "ETH Grid Trading",
      pairs: "ETH/USDT",
      status: "Active",
      icon: <TrendingUp className="text-white" size={24} />,
      bgColor: "bg-blue-500",
      lineColor: "#3b82f6",
      profit: "+3.2%",
      profitClass: "text-green-600",
      winRate: "72%",
      timeframe: "1h",
      trades: "286",
      risk: "Low",
      performance: Array(20)
        .fill(0)
        .map((_, i) => ({
          time: i,
          value: 100 + Math.random() * 15,
        })),
    },
    {
      name: "Cross-Chain Arb",
      pairs: "Multiple",
      status: "Active",
      icon: <ArrowUpCircle className="text-white" size={24} />,
      bgColor: "bg-purple-500",
      lineColor: "#9333ea",
      profit: "+2.9%",
      profitClass: "text-green-600",
      winRate: "81%",
      timeframe: "5m",
      trades: "523",
      risk: "High",
      performance: Array(20)
        .fill(0)
        .map((_, i) => ({
          time: i,
          value: 100 + Math.random() * 25,
        })),
    },
    {
      name: "DeFi Yield Bot",
      pairs: "LP Tokens",
      status: "Paused",
      icon: <Activity className="text-white" size={24} />,
      bgColor: "bg-green-500",
      lineColor: "#22c55e",
      profit: "-0.8%",
      profitClass: "text-red-600",
      winRate: "58%",
      timeframe: "1d",
      trades: "42",
      risk: "Medium",
      performance: Array(20)
        .fill(0)
        .map((_, i) => ({
          time: i,
          value: 100 - Math.random() * 10,
        })),
    },
    {
      name: "Volatility Surf",
      pairs: "BTC/ETH",
      status: "Active",
      icon: <ArrowUpCircle className="text-white" size={24} />,
      bgColor: "bg-red-500",
      lineColor: "#ef4444",
      profit: "+4.1%",
      profitClass: "text-green-600",
      winRate: "63%",
      timeframe: "2h",
      trades: "198",
      risk: "High",
      performance: Array(20)
        .fill(0)
        .map((_, i) => ({
          time: i,
          value: 100 + Math.random() * 30,
        })),
    },
    {
      name: "Stable Arbitrage",
      pairs: "USDC/USDT",
      status: "Active",
      icon: <ArrowDownCircle className="text-white" size={24} />,
      bgColor: "bg-teal-500",
      lineColor: "#14b8a6",
      profit: "+1.2%",
      profitClass: "text-green-600",
      winRate: "92%",
      timeframe: "15m",
      trades: "864",
      risk: "Low",
      performance: Array(20)
        .fill(0)
        .map((_, i) => ({
          time: i,
          value: 100 + Math.random() * 5,
        })),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Active Trading Strategies
        </h1>
        <div className="flex space-x-2">
          <select className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm">
            <option>Sort by Profit</option>
            <option>Sort by Risk</option>
            <option>Sort by Win Rate</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {strategies.map((strategy, index) => (
          <StrategyCard key={index} strategy={strategy} />
        ))}
      </div>
    </div>
  );
};

export default StrategiesPage;
