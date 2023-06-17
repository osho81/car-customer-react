import React from 'react';
import './App.css';
import "tailwindcss/tailwind.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeComponent from './components/WelcomeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import ListAllCarsComponent from './components/ListAllCarsComponent';
import ViewCarDetailsComponent from './components/ViewCarDetailsComponent ';
// import UpdateCarComponent from './components/UpdateCarComponent';
import OrderCarComponent from './components/OrderCarComponent';
import MyOrdersComponent from './components/MyOrdersComponent';

// See car-admin-react for keycloak comments
import Keycloak from 'keycloak-js';
import { ReactKeycloakProvider } from "@react-keycloak/web";


function App() {

  // See car-admin-react for keycloak comments
  const keycloak = new Keycloak({
    url: "http://localhost:8080",
    // url: "http://192.168.0.153:8080",
    realm: "car-rental-realm",
    clientId: "car-rental-v100",
    //  onLoad: 'login-required' 
  });


  const keycloakProviderInitConfig = {
    onLoad: 'login-required',
  }

  return (
    
    <div>

      <ReactKeycloakProvider
        authClient={keycloak}
        keycloak={keycloak}
        initOptions={keycloakProviderInitConfig}
      // initOptions={{ onLoad: 'login-required' }}
      >


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

              <Route path='/ordercar' element={< OrderCarComponent />}></Route>

              <Route path='/myorders' element={< MyOrdersComponent />}></Route>


              {/* DISABLED: View update car details, id NOT as pathvar, rather id from navigate state: */}
              {/* <Route path='/updatecar' element={< UpdateCarComponent />}></Route> */}

            </Routes>

          </div>


          {/* Add "permanent" footer component here */}
          <FooterComponent />

        </Router>

      </ReactKeycloakProvider>

    </div>
  );
}

export default App;
