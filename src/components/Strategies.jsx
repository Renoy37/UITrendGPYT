// File: components/Strategies.jsx
import React from "react";
import StrategyCard from "./StrategyCard";
import {
  Bitcoin,
  TrendingUp,
  ArrowUpCircle,
  ArrowDownCircle,
  Activity,
} from "lucide-react";

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
        .map((_, i) => ({ time: i, value: 100 + Math.random() * 20 })),
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
        .map((_, i) => ({ time: i, value: 100 + Math.random() * 15 })),
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
        .map((_, i) => ({ time: i, value: 100 + Math.random() * 25 })),
    },
    // New Strategy Card 1
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
        .map((_, i) => ({ time: i, value: 100 - Math.random() * 10 })),
    },
    // New Strategy Card 2
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
        .map((_, i) => ({ time: i, value: 100 + Math.random() * 30 })),
    },
    // New Strategy Card 3
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
        .map((_, i) => ({ time: i, value: 100 + Math.random() * 5 })),
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
