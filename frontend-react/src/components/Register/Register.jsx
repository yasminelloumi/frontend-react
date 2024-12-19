import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import background from "../../assets/background.jpg";
import logo from "../../assets/Logoo.png";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Register.css";
import { Link } from "react-router-dom";

function RegisterSection() {
  const [userName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialite, setSpecialite] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [role, setRole] = useState("pharmacien");
  const navigate = useNavigate(); // Use React Router's navigate hook

  const handleUserNameChange = (value) => {
    setName(value);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleSpecialiteChange = (value) => {
    setSpecialite(value);
  };

  const handleLicenseNumberChange = (value) => {
    setLicenseNumber(value);
  };

  const handleSave = () => {
    const data = {
      UserName: userName,
      Email: email,
      Password: password,
      Role: role,
      LicenseNumber: licenseNumber,
      Specialite: specialite,
    };

    const url = "/api/account/register";
    axios
      .post(url, data)
      .then((result) => {
        alert(result.data);
        navigate("/login"); // Redirect to /login upon success
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div>
      <style>
        {`
          body, html {
            height: 100%;
            margin: 0;
            padding: 0;
            background-image: url(${background});
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
          }

          .slide-in {
            animation: slideIn 1s ease-out forwards;
          }

          @keyframes slideIn {
            0% {
              transform: translateY(-100%);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}
      </style>

      <section
        className="text-center"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(8px)",
            zIndex: -1,
          }}
        ></div>

        <div
          className="card mx-4 mx-md-5 shadow-5-strong slide-in"
          style={{
            width: "800px",
            padding: "20px",
            background:
              "linear-gradient(to bottom, rgba(500,190,216,0), #dcedf0, #77e6cd, #dcedf0)",
          }}
        >
          <div className="card-body py-4 px-md-4">
            <div className="mb-4 text-center">
              <img
                src={logo}
                alt="Logo"
                style={{ maxWidth: "150px", marginBottom: "15px" }}
              />
            </div>
            <h2 className="fw-bold mb-4" style={{ fontSize: "2.2rem" }}>
              Sign Up
            </h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-outline mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={userName}
                  onChange={(e) => handleUserNameChange(e.target.value)}
                  style={{
                    fontSize: "1.2rem",
                    height: "50px",
                    padding: "10px 15px",
                  }}
                />
                <label className="form-label" style={{ fontSize: "1rem" }}>
                  Username
                </label>
              </div>

              <div className="form-outline mb-3">
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  style={{
                    fontSize: "1.2rem",
                    height: "50px",
                    padding: "10px 15px",
                  }}
                />
                <label className="form-label" style={{ fontSize: "1rem" }}>
                  Email address
                </label>
              </div>

              <div className="form-outline mb-3">
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  style={{
                    fontSize: "1.2rem",
                    height: "50px",
                    padding: "10px 15px",
                  }}
                />
                <label className="form-label" style={{ fontSize: "1rem" }}>
                  Password
                </label>
              </div>

              <div className="form-outline mb-3">
                <label className="form-label" style={{ fontSize: "1rem" }}>
                  Choose a Role
                </label>
                <select
                  className="form-select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  style={{
                    fontSize: "1.2rem",
                    height: "50px",
                    padding: "10px 15px",
                    borderRadius: "30px",
                  }}
                >
                  <option value="pharmacien">Pharmacien</option>
                  <option value="medecin">Medecin</option>
                  <option value="fournisseur">Fournisseur</option>
                </select>
              </div>

              {role === "medecin" && (
                <div className="form-outline mb-3">
                  <input
                    type="text"
                    className="form-control"
                    value={specialite}
                    onChange={(e) => handleSpecialiteChange(e.target.value)}
                    style={{
                      fontSize: "1.2rem",
                      height: "50px",
                      padding: "10px 15px",
                    }}
                  />
                  <label className="form-label" style={{ fontSize: "1rem" }}>
                    Speciality
                  </label>
                </div>
              )}

              {role === "pharmacien" && (
                <div className="form-outline mb-3">
                  <input
                    type="text"
                    className="form-control"
                    value={licenseNumber}
                    onChange={(e) => handleLicenseNumberChange(e.target.value)}
                    style={{
                      fontSize: "1.2rem",
                      height: "50px",
                      padding: "10px 15px",
                    }}
                  />
                  <label className="form-label" style={{ fontSize: "1rem" }}>
                    License Number
                  </label>
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  type="button"
                  className="btn btn-block mb-3"
                  style={{
                    fontSize: "1.2rem",
                    padding: "15px 30px",
                    borderRadius: "30px",
                    backgroundColor: "#5BAAA4",
                    borderColor: "#5BAAA4",
                    color: "#FFFFFF",
                    transition:
                      "background-color 0.3s ease, transform 0.2s ease",
                    boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.1)",
                    cursor: "pointer",
                    width: "250px",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#4A998D")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#5BAAA4")
                  }
                  onMouseDown={(e) =>
                    (e.target.style.transform = "scale(0.95)")
                  }
                  onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
                  onClick={handleSave}
                >
                  Sign Up
                </button>
              </div>
              {/* Login Link */}
              <p style={{ marginTop: "20px", fontSize: "1rem", color: "#333" }}>
                You have an Account Already?{" "}
                <Link
                  to="/Login"
                  style={{
                    color: "#000000",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RegisterSection;
