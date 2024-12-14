import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";

// Components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import ListePatient from "./components/PatientList/ListePatient";
import MedecinListe from "./components/Medecin/MedecinListe";
import ListeMedicament from "./components/Medicament/ListeMedicament";
import ListeOrdonnance from "./components/Ordonnance/ListeOrdonnance";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/pages/home";

const AppContent = () => {
  const location = useLocation();

  // Function to determine if Header/Footer should be hidden
  const shouldHideHeaderFooter = () =>
    ["/Login", "/Register"].includes(location.pathname);

  return (
    <div>
      {/* Conditionally render Header */}
      {!shouldHideHeaderFooter() && <Header />}

      <main>
        <Routes>
          <Route path="/" element={<Home/>} /> {/* Use Home Component */}
          <Route path="/ListePatient" element={<ListePatient />} />
          <Route path="/MedecinListe" element={<MedecinListe />} />
          <Route path="/ListeMedicament" element={<ListeMedicament />} />
          <Route path="/ListeOrdonnance" element={<ListeOrdonnance />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />{" "}
          {/* Fallback Route */}
        </Routes>
      </main>

      {/* Conditionally render Footer */}
      {!shouldHideHeaderFooter() && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
