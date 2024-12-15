import React from 'react';
import logo from "../../assets/logoo.png";
import './Footer.css';

const Footer = () => {
    return (
        <footer id="footer" className="cont"> {/* Added id="footer" */}
            <div className="row">
                {/* Left Section: Logo and Description */}
                <div className="col-md-4 mb-4">
                    <div className="d-flex align-items-center mb-3">
                        <img src={logo} alt="Platform Logo" className="img-fluid" style={{ maxHeight: "50px", marginRight: "10px" }} />
                        <h5 className="mb-0">E-Health</h5>
                    </div>
                    <p>
                        Our e-health platform revolutionizes access to care by connecting patients and healthcare professionals quickly and securely.
                        Benefit from accurate diagnoses, personalized follow-ups, and medical advice tailored to your needs. Your well-being is our priority!
                    </p>
                </div>

                {/* Center Section: Company Information */}
                <div className="col-md-4 mb-4">
                    <h5 className="mb-3">ABOUT US</h5>
                    <ul className="list-unstyled">
                        <li><a href="#home" className="text-light text-decoration-none">Home</a></li>
                        <li><a href="#mission" className="text-light text-decoration-none">Our Mission</a></li>
                        <li><a href="#services" className="text-light text-decoration-none">Services</a></li>
                        <li><a href="#testimonials" className="text-light text-decoration-none">Testimonials</a></li>
                    </ul>
                </div>

                {/* Right Section: Contact */}
                <div className="col-md-4 mb-4">
                    <h5 className="mb-3">CONTACT US</h5>
                    <ul className="list-unstyled">
                        <li>Phone: +33 1 23 45 67 89</li>
                        <li>Email: <a href="mailto:support@e-sante.com" className="text-light text-decoration-none">support@e-sante.com</a></li>
                        <li>Address: 123 Health Street, Paris, France</li>
                    </ul>
                </div>
            </div>

            <hr />
            <div>
                <p className="mb-0">
                    &copy; 2024 E-Health. All rights reserved. | <a href="#privacy" className="text-light text-decoration-none">Privacy Policy</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
