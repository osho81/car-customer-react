import React from 'react';
import './App.css';
import "tailwindcss/tailwind.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeComponent from './components/WelcomeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import ListAllCarsComponent from './components/ListAllCarsComponent';


function App() {
  return (

    <Router>

      {/* Add "permanent" header component with its navigation bar here */}
      <HeaderComponent/>

      <div className="App">

        {/* Part of webpage that changes content by navigation/clicks: */}

        <Routes>

          <Route path="/" element={< WelcomeComponent />}></Route>
          <Route path="/allcars" element={< ListAllCarsComponent />}></Route>
          

        </Routes>

      </div>


      {/* Add "permanent" footer component here */}
      <FooterComponent/>

    </Router>
  );
}

export default App;
