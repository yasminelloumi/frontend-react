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
import MenuProfile from "./components/admin/adminMenu";
import AdminProfile from "./components/admin/adminProfile";
import GestionPatients from "./components/admin/Gestionpatient";
import GestionOrdonnances from "./components/admin/Gestionordonnance";
import AjouterOrdonnance from "./components/admin/AjouterOrdonnance";
import GestionMedicaments from "./components/admin/Gestionmédicaments";
import GestionPersonnel from "./components/admin/Gestionpersonnel";
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
          <Route path="/GestionOrdonnances" element={<GestionOrdonnances />} />
          <Route path="/GestionPatients" element={<GestionPatients />} />
          <Route path="/MenuProfile" element={<MenuProfile />} />
          <Route path="/AdminProfile" element={<AdminProfile />} />
          <Route path="/AjouterOrdonnance" element={<AjouterOrdonnance />} />
          <Route path="/GestionMedicaments" element={<GestionMedicaments />} />
          <Route path="/GestionPersonnel" element={<GestionPersonnel />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
