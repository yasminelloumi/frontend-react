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
import AdminProfile from "./components/administrateur/ProfileAdmin";
import MenuProfile from "./components/administrateur/MenuProfile";
import GestionPersonnel from "./components/administrateur/Gestionpersonnel";
import GestionPatients from "./components/administrateur/GestionPatients";
import AjouterOrdonnance from "./components/administrateur/GestionOrdonnances";
import MedicamentManagement from "./components/administrateur/GestionMedicaments";
import MedicationProvider from "./components/Fournisseur/MedicationProvider";
import MedecinMenu from "./components/Medecin/MedecinMenu";
import EnvoyerOrdonnance from "./components/Medecin/EnvoyerOrdonnance";
import ProfileMedecin from "./components/Medecin/ProfileMedecin";
import { FaHome } from "react-icons/fa";

import Home from "./components/Pages/Home";
import ContactForm from "./components/Contact/Contact";
import AlerteMedicaments from "./components/administrateur/AlerteMedicaments";

const AppContent = () => {
  const location = useLocation();

  // Vérification si on doit masquer le Header et le Footer
  const shouldHideHeaderFooter = ["/Login", "/Register"].includes(
    location.pathname
  );

  return (
    <div>
      {/* Afficher Header si nécessaire */}
      {!shouldHideHeaderFooter && <Header />}

      <main>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Page d'accueil */}
          <Route path="/ListePatient" element={<ListePatient />} />
          <Route path="/MedecinListe" element={<MedecinListe />} />
          <Route path="/ListeMedicament" element={<ListeMedicament />} />
          <Route path="/ListeOrdonnance" element={<ListeOrdonnance />} />
          <Route path="/AdminProfile" element={<AdminProfile />} />
          <Route path="/MenuProfile" element={<MenuProfile />} />
          <Route path="/GestionPersonnel" element={<GestionPersonnel />} />
          <Route path="/GestionPatients" element={<GestionPatients />} />
          <Route path="/AjouterOrdonnance" element={<AjouterOrdonnance />} />
          <Route path="/MedecinMenu" element={<MedecinMenu />} />
          <Route path="/ProfileMedecin" element={<ProfileMedecin />} />
          <Route path="/EnvoyerOrdonnance" element={<EnvoyerOrdonnance />} />
          <Route
            path="/MedicamentManagement"
            element={<MedicamentManagement />}
          />
          <Route path="/MedicationProvider" element={<MedicationProvider />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/AlerteMedicaments" element={<AlerteMedicaments />} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />{" "}
          {/* Fallback Route */}
        </Routes>
      </main>

      {/* Afficher Footer si nécessaire */}
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
