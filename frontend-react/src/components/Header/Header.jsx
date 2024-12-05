import React from "react";
import logo from "../../assets/logo.png";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <img src={logo} alt="Logo" className="logo" />
      <ul className="header-menu">
        <Link to="/">Menu</Link>
        <Link to="/Profile">Profile</Link>
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
