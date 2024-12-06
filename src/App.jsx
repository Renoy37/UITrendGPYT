// src/App.jsx

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Strategies from "./components/Strategies";
import RunBot from "./components/RunBot";
import LoginModal from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext.jsx"; // Import AuthProvider

function App() {
  return (
    <Router>
      <AuthProvider>
        {" "}
        {/* Nest AuthProvider inside Router */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/strategies" element={<Strategies />} />
          <Route path="/run-bot" element={<RunBot />} />
          <Route path="/login" element={<LoginModal />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {/* Add more routes as needed */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
