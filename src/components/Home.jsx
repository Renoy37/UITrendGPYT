import React, { useState } from 'react';


function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const startBacktest = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/start-backtest');
      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert('An error occurred during the backtest. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1 className="title">Backtest Your Strategy</h1>
      <p>Press the button below to run the backtest.</p>

      <button className="btn" onClick={startBacktest} disabled={loading}>
        Start Backtest
      </button>

      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Running the backtest... Please wait!</p>
        </div>
      )}

      {result && (
        <div className="result-container">
          <h2>Backtest Results</h2>
          <p><b>Total Trades:</b> {result.analysis['Trade Analysis Results']['Total Trades']}</p>
          <p><b>Winning Trades:</b> {result.analysis['Trade Analysis Results']['Winning Trades']}</p>
          <p><b>Win Rate:</b> {result.analysis['Trade Analysis Results']['Win Rate']}</p>
          <img src={`data:image/png;base64,${result.plot}`} alt="Backtest plot" />
        </div>
      )}
    </div>
  );
}

export default App;
