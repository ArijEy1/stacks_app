// App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import Routes from './Routes'; // Import your routes configuration

function App() {
  return (
    <div className="App">
      <Router>
        <Routes /> {/* Render the routes */}
      </Router>
    </div>
  );
}

export default App;
