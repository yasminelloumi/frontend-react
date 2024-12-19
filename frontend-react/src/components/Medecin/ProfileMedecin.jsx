import "../Profile/ProfileModal.css"; // Add necessary styling
import avatarImage from "../../assets/userlogo.png"; // Replace with your image path
import { FaFacebookF, FaTwitter, FaSkype } from "react-icons/fa";

function ProfileMedecin() {
  return (
    <div className="profile-modal">
      {/* Profile Image */}
      <div className="profile-avatar">
        <img src={avatarImage} alt="Profile Avatar" />
      </div>

      {/* Name and Role */}
      <h2 className="profile-name">User Name</h2>
      <p className="profile-role">
        @Role| <a href="https://mdbootstrap.com">Email Address</a>
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
          <p>Type Name</p>
        </div>
        <div>
          <h4>Email Address</h4>
          <p>Type Email Address</p>
        </div>
        <div>
          <h4>Speciality </h4>
          <p>Speciality </p>
        </div>
      </div>
    </div>
  );
}

export default ProfileMedecin;
