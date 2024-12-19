import  { useState, useEffect } from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import background from "../../assets/background.jpg";
import logo from "../../assets/Logoo.png";
import { Link, useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import axios from "axios";
import "./Login.css";

function LoginSection() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleLogin = () => {
    const data = {
      Email: email,
      Password: password,
    };
    const url = "/api/account/login";

    axios
      .post(url, data)
      .then((result) => {
        // Check if the response contains a token and role
        if (result.data && result.data.token) {
          alert(
            "Login successful! Token: " +
              result.data.token +
              "ROLE!!!!!:" +
              result.data.roles
          );

          // Role-based redirection
          const userRole = result.data.roles;
          if (userRole === "pharmacien") {
            navigate("/"); // Redirect to Pharmacien page
          } else if (userRole === "medecin") {
            navigate("/"); // Redirect to Medecin page
          } else if (userRole === "fournisseur") {
            navigate("/MedicationProvider"); // Redirect to Medication Provider page
          } else if (userRole === "admin") {
            navigate("/MenuProfile"); // Redirect to Medication Provider page
          } else {
            alert("Unknown role, please contact support.");
          }

          // Store token in localStorage
          localStorage.setItem("authToken", result.data.token);
        } else {
          alert("Login failed: Token or role not received.");
        }
      })
      .catch((error) => {
        // Gracefully handle errors
        const errorMessage =
          error.response?.data?.message || "An error occurred during login.";
        alert(errorMessage);
      });
  };

  // Trigger animation on component mount
  useEffect(() => {
    setShowForm(true);
  }, []);

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

          .slide-enter {
            transform: translateY(-100%);
            opacity: 0;
            transition: transform 0.5s ease-out, opacity 0.5s ease-out;
          }

          .slide-enter-active {
            transform: translateY(0);
            opacity: 1;
          }

          .slide-exit {
            transform: translateY(0);
            opacity: 1;
            transition: transform 0.5s ease-in, opacity 0.5s ease-in;
          }

          .slide-exit-active {
            transform: translateY(-100%);
            opacity: 0;
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

        <CSSTransition
          in={showForm}
          timeout={500}
          classNames="slide"
          unmountOnExit
        >
          <div
            className="card mx-4 mx-md-5 shadow-5-strong"
            style={{
              width: "800px",
              padding: "45px",
              background:
                "linear-gradient(to bottom, rgba(255, 255, 255, 0), #dcedf0, #77e6cd, #dcedf0)",
            }}
          >
            <div className="card-body py-4 px-md-4">
              <div className="row d-flex justify-content-center">
                <div className="col-lg-10">
                  <div className="mb-4">
                    <img
                      src={logo}
                      alt="Logo"
                      style={{ maxWidth: "150px", marginBottom: "15px" }}
                    />
                  </div>
                  <h2 className="fw-bold mb-4" style={{ fontSize: "2.2rem" }}>
                    Sign In
                  </h2>
                  <form>
                    {/* Email */}
                    <div className="form-outline mb-3">
                      <input
                        type="email"
                        id="form3Example3"
                        className="form-control"
                        style={{
                          fontSize: "1.2rem",
                          height: "50px",
                          padding: "10px 15px",
                        }}
                        value={email}
                        onChange={(e) => handleEmailChange(e.target.value)}
                      />
                      <label
                        className="form-label"
                        htmlFor="form3Example3"
                        style={{ fontSize: "1rem" }}
                      >
                        Email address
                      </label>
                    </div>

                    {/* Password */}
                    <div className="form-outline mb-3">
                      <input
                        type="password"
                        id="form3Example4"
                        className="form-control"
                        style={{
                          fontSize: "1.2rem",
                          height: "50px",
                          padding: "10px 15px",
                        }}
                        value={password}
                        onChange={(e) => handlePasswordChange(e.target.value)}
                      />
                      <label
                        className="form-label"
                        htmlFor="form3Example4"
                        style={{ fontSize: "1rem" }}
                      >
                        Password
                      </label>
                    </div>

                    {/* Submit Button */}
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <button
                        type="button"
                        className="btn btn-block mb-3"
                        style={{
                          fontSize: "1.2rem",
                          padding: "15px 30px",
                          borderRadius: "30px",
                          backgroundColor: "#5BAAA4",
                          color: "#FFFFFF",
                          width: "250px",
                        }}
                        onClick={handleLogin}
                      >
                        Sign In
                      </button>
                    </div>

                    {/* Register Link */}
                    <p
                      style={{
                        marginTop: "20px",
                        fontSize: "1rem",
                        color: "#333",
                      }}
                    >
                      Don&apos;t have an account?{" "}
                      <Link
                        to="/Register"
                        style={{
                          color: "#000000",
                          textDecoration: "none",
                          fontWeight: "bold",
                        }}
                      >
                        Register
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </CSSTransition>
      </section>
    </div>
  );
}

export default LoginSection;
