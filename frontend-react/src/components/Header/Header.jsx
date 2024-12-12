import React from "react";
import logo from "../../assets/Logoo.png";
import "./Header.css";
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
