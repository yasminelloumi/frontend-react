import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/footer";
import "@fortawesome/fontawesome-free/css/all.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
};

export default App;
