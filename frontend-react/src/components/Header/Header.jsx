import React from "react";
import logo from "../../assets/logo.png";  // Ensure the logo path is correct (adjusted from "Logoo.png")
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <img src={logo} alt="Logo" className="logo" />

      <ul className="header-menu">
        <Link to="/">HOME</Link>
        <Link to="/Profile">PROFILE</Link>
        <Link to="/ABOUT">ABOUT</Link>
        <Link to="/CONTACT">CONTACT</Link>
        <a href="#e-sante">E-Santé</a> {/* Cible la section E-Santé */}
        <a href="#a-propos">À Propos</a> {/* Cible la section À Propos */}
        <a href="#contactez-nous">Contactez-nous</a> {/* Cible la section Contactez-nous */}
      </ul>

      <div className="header-right">
        <Link to="/Login">
          <i className="fa-solid fa-user"></i>
        </Link>
      </div>
    </div>
  );
}

export default Header;
