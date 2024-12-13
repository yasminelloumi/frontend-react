<<<<<<< HEAD
import logo from "../../assets/logo.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
=======
import React from "react";
import logo from "../../assets/Logoo.png";
import "./Header.css";
>>>>>>> 8a00477c78b3a3d4d9519f8bf46bc7833334a9ed
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <img src={logo} alt="Logo" className="logo" />

      <ul className="header-menu">
<<<<<<< HEAD
        <a href="#e-sante">E-Santé</a>  {/* Cible la section E-Santé */}
        <a href="#a-propos">À Propos</a> {/* Cible la section À Propos */}
        <a href="#contactez-nous">Contactez-nous</a> {/* Cible la section Contactez-nous */}
        <Link to="/">Menu</Link>
        {/* Correct the link to AdminProfile */}
        <Link to="/AdminProfile">Profile</Link>
=======
        <Link to="/">HOME</Link>
        <Link to="/Profile">PROFILE</Link>
        <Link to="/ABOUT">ABOUT</Link>
        <Link to="/CONTACT">CONTACT</Link>
>>>>>>> 8a00477c78b3a3d4d9519f8bf46bc7833334a9ed
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
