import React, { useState } from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import background from "../../assets/background.jpg";
import logo from "../../assets/Logoo.png";
import { Link } from "react-router-dom";
import "./Register.css";


const RegisterSection = () => {
  const [role, setRole] = useState("patient");
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    role: "patient",
    licenseNumber: "",
    specialite: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
          margin: 0,
          padding: 0,
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
            maxWidth: "1000px",
            padding: "20px",
            backdropFilter: "none",
            background:
              "linear-gradient(to bottom, rgba(500,190,216,0), #dcedf0, #77e6cd, #dcedf0)",
          }}
        >
          <div className="card-body py-4 px-md-4">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-10">
                <div className="mb-4">
                  <img
                    src={logo}
                    alt="Logo"
                    style={{
                      maxWidth: "150px",
                      marginBottom: "15px",
                    }}
                  />
                </div>
                <h2 className="fw-bold mb-4" style={{ fontSize: "2.2rem" }}>
                  Sign Up
                </h2>
                <form>
                  <div className="form-outline mb-3">
                    <input
                      type="text"
                      name="userName"
                      className="form-control"
                      value={formData.userName}
                      onChange={handleInputChange}
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
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleInputChange}
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
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleInputChange}
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
                      Choose One Option
                    </label>
                    <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <select
                      name="role"
                      className="form-select"
                      value={formData.role}
                      onChange={(e) => {
                        handleInputChange(e);
                        setRole(e.target.value);
                      }}
                      style={{
                        fontSize: "1.2rem",
                        height: "50px",
                        padding: "10px 15px",
                        borderRadius: "30px",
                        
                      }}
                    >
                      <option value="patient">Patient</option>
                      <option value="medecin">Medecin</option>
                    </select>
                    </div>
                  </div>

                  {role === "medecin" && (
                    <div className="form-outline mb-3">
                      <input
                        type="text"
                        name="specialite"
                        className="form-control"
                        value={formData.specialite}
                        onChange={handleInputChange}
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

                  {role === "patient" && (
                    <div className="form-outline mb-3">
                      <input
                        type="text"
                        name="licenseNumber"
                        className="form-control"
                        value={formData.licenseNumber}
                        onChange={handleInputChange}
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

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      type="submit"
                      className="btn btn-block mb-3"
                      style={{
                        fontSize: "1.2rem",
                        padding: "15px 30px",
                        borderRadius: "30px",
                        backgroundColor: "#5BAAA4",
                        borderColor: "#5BAAA4",
                        color: "#FFFFFF",
                        transition: "background-color 0.3s ease, transform 0.2s ease",
                        boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.1)",
                        cursor: "pointer",
                        width: "250px",
                      }}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = "#5BAAA4")}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = "#4A998D")}
                      onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
                      onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
                    >
                      Sign Up
                    </button>
                  </div>

                  <p style={{ marginTop: "20px", fontSize: "1rem", color: "#333" }}>
                    Already have an account?{" "}
                    <Link
                      to="/Login"
                      style={{
                        color: "#000000",
                        textDecoration: "none",
                        fontWeight: "bold",
                      }}
                    >
                      Sign In
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterSection;


