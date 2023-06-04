import React from 'react';
import './App.css';
import "tailwindcss/tailwind.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeComponent from './components/WelcomeComponent';

function App() {
  return (

    <Router>

      {/* Add "permanent" header component here */}

      <div className="App">

        {/* Part of webpage that changes content by navigation/clicks: */}

        <Routes>

          <Route path="/" element={< WelcomeComponent />}></Route>

        </Routes>

      </div>


      {/* Add "permanent" footer component here */}

    </Router>
  );
}

export default App;
