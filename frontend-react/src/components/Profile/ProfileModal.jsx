import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import "./ProfileModal.css"; // Add necessary styling
import avatarImage from "../../assets/userlogo.png"; // Replace with your image path
import { FaFacebookF, FaTwitter, FaSkype } from "react-icons/fa";

function ProfileModal() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Please log in to access your profile.");
      return;
    }

    axios
      .get("/api/Account/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data); // Log the profile data here to check its structure
        setProfileData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
        alert("Failed to fetch profile data. Please try again.");
      });
  }, []);

  // If data is not yet fetched, show loading indicator
  if (!profileData) {
    return <div>Loading...</div>;
  }

  // Conditionally render Speciality or License Number based on role
  let specialityOrLicense;
  if (profileData.role === "medecin") {
    // Make sure to use correct role name
    specialityOrLicense =
      profileData.additionalDetails?.specialite || "Not provided"; // Access specialite from additionalDetails
  } else if (profileData.role === "pharmacien") {
    specialityOrLicense =
      profileData.additionalDetails?.licenseNumber || "Not provided";
  } else if (
    profileData.role === "fournisseur" ||
    profileData.role === "admin"
  ) {
    specialityOrLicense = "";
  }

  return (
    <div className="profile-modal">
      {/* Profile Image */}
      <div className="profile-avatar">
        <img src={avatarImage} alt="Profile Avatar" />
      </div>

      {/* Name and Role */}
      <h2 className="profile-name">{profileData.userName}</h2>
      <p className="profile-role">
        {profileData.role} |{" "}
        <a href={`mailto:${profileData.email}`}>{profileData.email}</a>
      </p>

      {/* Social Media Icons */}
      <div className="profile-socials">
        <FaFacebookF className="social-icon" />
        <FaTwitter className="social-icon" />
        <FaSkype className="social-icon" />
      </div>

      {/* Profile Stats */}
      <div className="profile-stats">
        <div>
          <h4>Name</h4>
          <p>{profileData.userName}</p>
        </div>
        <div>
          <h4>Email Address</h4>
          <p>{profileData.email}</p>
        </div>
        <div>
          <h4>Speciality or License Number</h4>
          <p>{specialityOrLicense}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
