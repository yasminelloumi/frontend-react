import React from "react";
import logo from "../../assets/logo.png";


function Header() {
  return (
    <div className="navbar">
      <img src={logo} alt="Logo" className="logo" /> 
      <ul className="navbar-menu">
        <a href="#">Menu</a> 
        <a href="#">Profile</a>
      </ul>
    </div>
  );
}

export default Header;
