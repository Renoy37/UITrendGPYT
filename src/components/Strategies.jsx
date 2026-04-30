// File: components/Strategies.jsx
import React, { useMemo, useState } from "react";
import StrategyCard from "./StrategyCard";
import {
  TrendingUp,
  ArrowUpCircle,
  ArrowDownCircle,
  Activity,
} from "lucide-react";

const StrategiesPage = () => {
  const [sortBy, setSortBy] = useState("profit");

  const strategies = useMemo(() => [
    {
      name: "USDJPY Harmonic",
      pairs: "USD/JPY",
      status: "Active",
      icon: <TrendingUp className="text-white" size={24} />,
      bgColor: "bg-slate-900",
      lineColor: "#10b981",
      profit: "+3.8%",
      profitClass: "text-emerald-600",
      winRate: "68%",
      timeframe: "5m",
      trades: "142",
      risk: "Medium",
      performance: Array(20)
        .fill(0)
        .map((_, i) => ({ time: i, value: 100 + Math.random() * 20 })),
    },
    {
      name: "EURUSD Trend Bot",
      pairs: "EUR/USD",
      status: "Active",
      icon: <TrendingUp className="text-white" size={24} />,
      bgColor: "bg-emerald-600",
      lineColor: "#059669",
      profit: "+3.2%",
      profitClass: "text-emerald-600",
      winRate: "72%",
      timeframe: "30m",
      trades: "286",
      risk: "Low",
      performance: Array(20)
        .fill(0)
        .map((_, i) => ({ time: i, value: 100 + Math.random() * 15 })),
    },
    {
      name: "GBPUSD Breakout",
      pairs: "GBP/USD",
      status: "Active",
      icon: <ArrowUpCircle className="text-white" size={24} />,
      bgColor: "bg-amber-500",
      lineColor: "#f59e0b",
      profit: "+2.9%",
      profitClass: "text-emerald-600",
      winRate: "64%",
      timeframe: "15m",
      trades: "523",
      risk: "High",
      performance: Array(20)
        .fill(0)
        .map((_, i) => ({ time: i, value: 100 + Math.random() * 25 })),
    },
    {
      name: "USDCHF Pivot Bot",
      pairs: "USD/CHF",
      status: "Paused",
      icon: <Activity className="text-white" size={24} />,
      bgColor: "bg-cyan-700",
      lineColor: "#0e7490",
      profit: "-0.8%",
      profitClass: "text-rose-600",
      winRate: "58%",
      timeframe: "5m",
      trades: "42",
      risk: "Medium",
      performance: Array(20)
        .fill(0)
        .map((_, i) => ({ time: i, value: 100 - Math.random() * 10 })),
    },
    {
      name: "AUDUSD Mean Reversion",
      pairs: "AUD/USD",
      status: "Active",
      icon: <ArrowUpCircle className="text-white" size={24} />,
      bgColor: "bg-rose-600",
      lineColor: "#e11d48",
      profit: "+4.1%",
      profitClass: "text-emerald-600",
      winRate: "63%",
      timeframe: "30m",
      trades: "198",
      risk: "High",
      performance: Array(20)
        .fill(0)
        .map((_, i) => ({ time: i, value: 100 + Math.random() * 30 })),
    },
    {
      name: "EURAUD Swing Bot",
      pairs: "EUR/AUD",
      status: "Active",
      icon: <ArrowDownCircle className="text-white" size={24} />,
      bgColor: "bg-teal-600",
      lineColor: "#0d9488",
      profit: "+1.2%",
      profitClass: "text-emerald-600",
      winRate: "71%",
      timeframe: "1h",
      trades: "864",
      risk: "Low",
      performance: Array(20)
        .fill(0)
        .map((_, i) => ({ time: i, value: 100 + Math.random() * 5 })),
    },
  ], []);

  const sortedStrategies = useMemo(() => {
    const riskScore = {
      Low: 1,
      Medium: 2,
      High: 3,
    };

    const parsePercent = (value) => Number(value.replace("%", ""));

    return [...strategies].sort((a, b) => {
      if (sortBy === "risk") {
        return riskScore[a.risk] - riskScore[b.risk];
      }

      if (sortBy === "winRate") {
        return parsePercent(b.winRate) - parsePercent(a.winRate);
      }

      return parsePercent(b.profit) - parsePercent(a.profit);
    });
  }, [sortBy, strategies]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Active Trading Strategies
        </h1>
        <div className="flex space-x-2">
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="bg-white border border-slate-300 rounded-lg px-4 py-2 text-sm text-slate-700"
          >
            <option value="profit">Sort by Profit</option>
            <option value="risk">Sort by Risk</option>
            <option value="winRate">Sort by Win Rate</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedStrategies.map((strategy) => (
          <StrategyCard key={strategy.name} strategy={strategy} />
        ))}
      </div>
    </div>
  );
};

export default StrategiesPage;
