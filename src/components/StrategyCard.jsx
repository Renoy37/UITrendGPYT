// File: components/StrategyCard.js
import React, { useState, useEffect } from "react";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";
import { useNavigate } from "react-router-dom";
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
  const [performance, setPerformance] = useState(strategy.performance);
  const navigate = useNavigate();

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

  const handleRunClick = () => {
    navigate("/run-bot");
  };

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

      <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-4">
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

      {/* Run Button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleRunClick}
          className="text-sm bg-purple-600 hover:bg-purple-700 text-white font-semibold py-1 px-3 rounded-md"
        >
          Run
        </button>
      </div>
    </div>
  );
};

export default StrategyCard;
