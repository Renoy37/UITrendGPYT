import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import StrategiesPage from "./components/Strategies";
import About from "./components/About";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/strategies" element={<StrategiesPage />} />
        <Route path="/backtest" element={<StrategiesPage />} />
        <Route path="/about" element={<About />} /> {/* About page route */}
      </Routes>
    </Router>
  );
}

export default App;
