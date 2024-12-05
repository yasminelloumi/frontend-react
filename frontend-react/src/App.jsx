import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/footer";
import "@fortawesome/fontawesome-free/css/all.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Body from "./components/Body/Body";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ListePatient from "./components/Patient/ListePatient";

const App = () => {
  return (
    <div>
      <Header />
      
    
        
      <Router>

        <Routes>
          <Route path="/" element={<Body />} />

          <Route path="/ListePatient" element={<ListePatient />}></Route>

        </Routes>
      </Router>

      <Footer />
    </div>
  );
};

export default App;
