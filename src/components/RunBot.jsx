// src/components/RunBot.js

import React, { useContext, useState, useEffect } from "react";
import { AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { toast } from "react-toastify"; // Import toast from react-toastify

const BACKEND_URL = "https://derivautobot-production.up.railway.app";

const RunBot = () => {
  const { isAuthenticated } = useContext(AuthContext);

  // State to manage bot statuses
  const [botStatus, setBotStatus] = useState({
    one_hour: false,
    thirty_min: false,
    fifteen_minute: false,
  });

  // Fetch the current status of all bots when component mounts
  useEffect(() => {
    if (isAuthenticated) {
      fetch(`${BACKEND_URL}/Bots/bots/status`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            const runningBots = data.running_bots.reduce((acc, bot) => {
              acc[bot.bot_name] = bot.status === "running";
              return acc;
            }, {});
            setBotStatus(runningBots);
          }
        })
        .catch((error) => {
          console.error("Error fetching bot statuses:", error);
          toast.error("Failed to fetch bot statuses.");
        });
    }
  }, [isAuthenticated]);

  // Helper function to update bot status in state
  const updateBotStatus = (botName, status) => {
    setBotStatus((prevStatus) => ({
      ...prevStatus,
      [botName]: status,
    }));
  };

  // Function to start a specific bot
  const handleStartBot = async (botName) => {
    try {
      const response = await fetch(`${BACKEND_URL}/Bots/bot/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bot_name: botName }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`Bot '${botName}' started successfully!`);
        updateBotStatus(botName, true);
      } else {
        toast.error(`Failed to start bot '${botName}': ${data.message}`);
      }
    } catch (error) {
      console.error("Error starting bot:", error);
      toast.error("An error occurred while starting the bot.");
    }
  };

  // Function to stop a specific bot
  const handleStopBot = async (botName) => {
    try {
      const response = await fetch(`${BACKEND_URL}/Bots/bot/stop`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bot_name: botName }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`Bot '${botName}' stopped successfully!`);
        updateBotStatus(botName, false);
      } else {
        toast.error(`Failed to stop bot '${botName}': ${data.message}`);
      }
    } catch (error) {
      console.error("Error stopping bot:", error);
      toast.error("An error occurred while stopping the bot.");
    }
  };

  // Function to start all bots
  const handleStartAllBots = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/Bots/bots/start_all`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();

      if (response.ok) {
        data.results.forEach((result) => {
          if (result.status === "started") {
            toast.success(`Bot '${result.bot}' started successfully!`);
            updateBotStatus(result.bot, true);
          } else if (result.status === "already running") {
            toast.info(`Bot '${result.bot}' is already running.`);
          } else {
            toast.error(`Failed to start bot '${result.bot}'.`);
          }
        });
      } else {
        toast.error("Failed to start all bots.");
      }
    } catch (error) {
      console.error("Error starting all bots:", error);
      toast.error("An error occurred while starting all bots.");
    }
  };

  // Function to stop all bots
  const handleStopAllBots = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/Bots/bots/stop_all`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();

      if (response.ok) {
        data.results.forEach((result) => {
          if (result.status === "success") {
            toast.success(`Bot '${result.bot}' stopped successfully!`);
            updateBotStatus(result.bot, false);
          } else {
            toast.error(
              `Failed to stop bot '${result.bot}': ${result.message}`
            );
          }
        });
      } else {
        toast.error("Failed to stop all bots.");
      }
    } catch (error) {
      console.error("Error stopping all bots:", error);
      toast.error("An error occurred while stopping all bots.");
    }
  };

  // Function to fetch updated bot statuses (optional: can be called periodically)
  const fetchBotStatuses = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/Bots/bots/status`);
      const data = await response.json();

      if (data.status === "success") {
        const runningBots = data.running_bots.reduce((acc, bot) => {
          acc[bot.bot_name] = bot.status === "running";
          return acc;
        }, {});
        setBotStatus(runningBots);
      }
    } catch (error) {
      console.error("Error fetching bot statuses:", error);
      // Optionally, show a toast or silently fail
    }
  };

  // Optional: Poll bot statuses every minute
  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(() => {
        fetchBotStatuses();
      }, 60000); // 60,000 ms = 1 minute

      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

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

  // Bot details
  const bots = [
    {
      name: "fifteen_minute",
      displayName: "Fifteen Minute Bot",
      description: "Executes trades on a 15-minute timeframe.",
    },
    {
      name: "one_hour",
      displayName: "One Hour Bot",
      description:
        "Executes trades on a 1-hour timeframe, ideal for medium-term strategies.",
    },
    {
      name: "thirty_min",
      displayName: "Thirty Minute Bot",
      description:
        "Executes trades on a 30-minute timeframe, balancing frequency and analysis.",
    },
  ];

  // Get the list of running bots for the Running Bots section
  const runningBots = Object.keys(botStatus).filter((bot) => botStatus[bot]);

  return (
    <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Available Trading Bots
      </h2>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row justify-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
        <button
          onClick={handleStartAllBots}
          className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-md shadow-lg transition duration-300"
        >
          Start All Bots
        </button>
        <button
          onClick={handleStopAllBots}
          className="w-full md:w-auto bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-md shadow-lg transition duration-300"
        >
          Stop All Bots
        </button>
      </div>

      {/* Bot Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {bots.map((bot) => (
          <div
            key={bot.name}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between transform hover:scale-105 transition duration-300"
          >
            <div>
              <h3 className="text-xl font-semibold mb-4">{bot.displayName}</h3>
              <p className="text-gray-600">{bot.description}</p>
            </div>
            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={() =>
                  botStatus[bot.name]
                    ? handleStopBot(bot.name)
                    : handleStartBot(bot.name)
                }
                className={`${
                  botStatus[bot.name]
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                } text-white font-bold py-2 px-4 rounded-md shadow-lg transition duration-300`}
              >
                {botStatus[bot.name] ? "Stop" : "Start"}
              </button>
              {botStatus[bot.name] ? (
                <CheckCircle className="text-green-500" size={24} />
              ) : (
                <XCircle className="text-red-500" size={24} />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Running Bots Section */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold mb-4 text-center">
          Currently Running Bots
        </h3>
        {runningBots.length > 0 ? (
          <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-6 rounded-lg shadow-md">
            <ul className="list-disc list-inside">
              {runningBots.map((bot) => {
                // Find the display name from bots array
                const botInfo = bots.find((b) => b.name === bot);
                return (
                  <li key={bot} className="flex items-center space-x-2">
                    <CheckCircle className="text-green-500" size={20} />
                    <span>{botInfo ? botInfo.displayName : bot}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-6 rounded-lg shadow-md">
            <p>No bots are currently running.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RunBot;
