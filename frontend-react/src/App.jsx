import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";

// Components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Body from "./components/Body/Body";
import ListePatient from "./components/PatientList/ListePatient";
import MedecinListe from "./components/Medecin/MedecinListe";
import ListeMedicament from "./components/Medicament/ListeMedicament";
import ListeOrdonnance from "./components/Ordonnance/ListeOrdonnance";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import BackgroundImage from "./components/bodyImageBackground/backgroundImage";
import AdminProfile from "./components/administrateur/ProfileAdmin";
import MenuProfile from "./components/administrateur/MenuAdmin";
import GestionPersonnel from "./components/administrateur/Gestionpersonnel";
import GestionPatients from "./components/administrateur/GestionPatients";
import AjouterOrdonnance from "./components/administrateur/GestionOrdonnances";
import MedicamentManagement from "./components/administrateur/GestionMedicaments";

const AppContent = () => {
  const location = useLocation();

  // Check if the current route is "/Login" or "/Register" to hide header and footer
  const shouldHideHeaderFooter = ["/Login", "/Register"].includes(location.pathname);

  return (
    <div>
      {/* Conditionally render Header */}
      {!shouldHideHeaderFooter && <Header />}
      {!shouldHideHeaderFooter && <BackgroundImage />}

      <main>
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/ListePatient" element={<ListePatient />} />
          <Route path="/MedecinListe" element={<MedecinListe />} />
          <Route path="/ListeMedicament" element={<ListeMedicament />} />
          <Route path="/ListeOrdonnance" element={<ListeOrdonnance />} />
          <Route path="/AdminProfile" element={<AdminProfile />} />
          <Route path="/MenuProfile" element={<MenuProfile />} />
          <Route path="/GestionPersonnel" element={<GestionPersonnel />} />
          <Route path="/GestionPatients" element={<GestionPatients />} />
          <Route path="/AjouterOrdonnance" element={<AjouterOrdonnance />} />
          <Route path="/MedicamentManagement" element={<MedicamentManagement />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </main>

      {/* Conditionally render Footer */}
      {!shouldHideHeaderFooter && <Footer />}
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
