import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Body from "./components/Body/Body";
import ListePatient from "./components/PatientList/ListePatient";
// Correct import

const App = () => {
  return (
    <div>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/ListePatient" element={<ListePatient />} />{" "}
          {/* Fixed reference */}
        </Routes>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
