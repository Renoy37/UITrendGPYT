// File: components/HomePageContent.js
import React from "react";
import {
  BarChart2,
  Play,
  ShieldCheck,
  Signal,
  SlidersHorizontal,
} from "lucide-react";
import { Link } from "react-router-dom";

const HomePageContent = ({ startBacktest, loading }) => {
  return (
    <>
      {/* Hero Section */}
      <section className="text-center mb-12 rounded-lg bg-slate-950 px-6 py-14 shadow-xl shadow-slate-900/10">
        <h1 className="text-5xl font-bold text-white mb-4">
          Welcome to <span className="text-emerald-300">GambiAI</span>
        </h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
          Dive into the world of algorithmic trading with expertly crafted bots
          for forex markets. Buy or rent, monitor performance, and
          optimize your strategies - all in one platform.
        </p>
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mb-12">
          <button
            onClick={startBacktest}
            className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold py-3 px-6 rounded-lg flex items-center justify-center transition duration-300"
            disabled={loading}
          >
            <BarChart2 className="mr-2" />
            {loading ? "Running Backtest..." : "Start Backtest"}
          </button>
          <Link
            to="/strategies"
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold py-3 px-6 rounded-lg flex items-center justify-center transition duration-300"
          >
            <Play className="mr-2" />
            Explore Bots
          </Link>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-center text-slate-900 mb-8">
          Why Choose GambiAI?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-lg transition-all">
            <Signal className="text-emerald-600 mb-4" size={48} />
            <h3 className="text-xl font-bold text-slate-800">
              Comprehensive Analytics
            </h3>
            <p className="text-slate-600">
              Real-time performance metrics give you the insights needed to make
              data-driven decisions.
            </p>
          </div>
          <div className="p-6 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-lg transition-all">
            <SlidersHorizontal className="text-emerald-600 mb-4" size={48} />
            <h3 className="text-xl font-bold text-slate-800">
              Advanced Algorithmic Bots
            </h3>
            <p className="text-slate-600">
              Access trading bots optimized for major and minor forex pairs,
              ready for purchase or rental.
            </p>
          </div>
          <div className="p-6 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-lg transition-all">
            <ShieldCheck className="text-emerald-600 mb-4" size={48} />
            <h3 className="text-xl font-bold text-slate-800">
              User-Friendly Design
            </h3>
            <p className="text-slate-600">
              An intuitive interface to easily monitor, manage, and optimize
              your trading strategies.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePageContent;
