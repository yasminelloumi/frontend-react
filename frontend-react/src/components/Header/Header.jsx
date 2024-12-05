import React from "react";
import logo from "../../assets/logo.png";

function Header() {
  return (
    <div className="header">
      <img src={logo} alt="Logo" className="logo" />
      <ul className="header-menu">
        <a href="#">Menu</a>
        <a href="#">Profile</a>
      </ul>
      
      <div className="header-right">
        <i className="fa-solid fa-user"></i>
      </div>
    </div>
  );
}

export default Header;
