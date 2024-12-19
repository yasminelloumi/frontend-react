import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import PersonalProfile from "../Profile/ProfileModal"; // Import modal content
import logo from "../../assets/Logoo.png";
import "./Header.css";

function Header() {
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Handlers for opening and closing the profile modal
  const handleShowProfile = () => setShowProfileModal(true);
  const handleCloseProfile = () => setShowProfileModal(false);

  // Scroll to the footer section smoothly
  const scrollToFooter = () => {
    const footer = document.getElementById("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="header">
      {/* Logo Section */}
      <div className="header-left">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      </div>

      {/* Navigation Menu */}
      <ul className="header-menu">
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="#" onClick={handleShowProfile}>
            PROFILE
          </Link>
        </li>
        <li>
          <Link to="#" onClick={scrollToFooter}>
            ABOUT
          </Link>
        </li>
        <li>
          <Link to="/contact">CONTACT</Link>
        </li>
      </ul>

      {/* User Login Icon */}
      <div className="header-right">
        <Link to="/Login" title="Login">
          <i className="fa-solid fa-user"></i>
        </Link>
      </div>

      {/* Profile Modal */}
      <Modal show={showProfileModal} onHide={handleCloseProfile} centered>
        <Modal.Header closeButton>
          <Modal.Title>User Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PersonalProfile />
        </Modal.Body>
      </Modal>
    </nav>
  );
}

export default Header;
