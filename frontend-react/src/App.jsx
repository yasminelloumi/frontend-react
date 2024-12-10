import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.min.css";
 


// Components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Body from "./components/Body/Body";
import ListePatient from "./components/PatientList/ListePatient";
import MedecinListe from "./components/Medecin/MedecinListe";
import ListeMedicament from "./components/Medicament/ListeMedicament";
import ListeOrdonnance from "./components/Ordonnance/ListeOrdonnance";
import Login from "./components/Login/Login";

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/ListePatient" element={<ListePatient />} />
          <Route path="/MedecinListe" element={<MedecinListe />} />
          <Route path="/ListeMedicament" element={<ListeMedicament />} />
          <Route path="/ListeOrdonnance" element={<ListeOrdonnance />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
