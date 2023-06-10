import React from 'react';
import './App.css';
import "tailwindcss/tailwind.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeComponent from './components/WelcomeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import ListAllCarsComponent from './components/ListAllCarsComponent';
import ViewCarDetailsComponent from './components/ViewCarDetailsComponent ';
import UpdateCarComponent from './components/UpdateCarComponent';


function App() {
  return (

    <Router>

      {/* Add "permanent" header component with its navigation bar here */}
      <HeaderComponent />

      <div className="App">

        {/* Part of webpage that changes content by navigation/clicks: */}

        <Routes>

          <Route path="/" element={< WelcomeComponent />}></Route>

          {/* Null type as props will get all cars, else type is set as props */}
          <Route path="/allcars" element={< ListAllCarsComponent type={null} />}></Route>
          <Route path="/minicars" element={< ListAllCarsComponent type="mini" />}></Route>
          <Route path="/sedancars" element={< ListAllCarsComponent type="sedan" />}></Route>
          <Route path="/sportcars" element={< ListAllCarsComponent type="sport" />}></Route>
          <Route path="/cabcars" element={< ListAllCarsComponent type="cab" />}></Route>
          <Route path="/suvcars" element={< ListAllCarsComponent type="suv" />}></Route>
          <Route path="/buscars" element={< ListAllCarsComponent type="bus" />}></Route>

          {/* View car details, id as pathvar: */}
          {/* <Route path='/car/:id' element={< ViewCarDetailsComponent />}></Route> */}

          {/* View car details, id as navigate state (to be able to render next car etc): */}
          <Route path='/car' element={< ViewCarDetailsComponent />}></Route>


          {/* DISABLED: View update car details, id NOT as pathvar, rather id from navigate state: */}
          {/* <Route path='/updatecar' element={< UpdateCarComponent />}></Route> */}

        </Routes>

      </div>


      {/* Add "permanent" footer component here */}
      <FooterComponent />

    </Router>
  );
}

export default App;
