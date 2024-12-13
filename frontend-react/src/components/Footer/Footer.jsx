import React from 'react';
import logo from "../../assets/logo.png";
//import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';

const Footer = () => {
    return (
        <footer  className= "cont">
           
                <div className="row">

                    {/* Section gauche : Logo et description */}
                    <div className="col-md-4 mb-4">
                        <div className="d-flex align-items-center mb-3">
                            <img src={logo} alt="Platform Logo" className="img-fluid" style={{ maxHeight: "50px", marginRight: "10px" }} />
                            <h5 className="mb-0">E-Santé</h5>
                        </div>
                        <p>
                            Notre plateforme e-santé révolutionne l'accès aux soins en connectant les patients et les professionnels de santé de manière rapide et sécurisée.
                            Profitez de diagnostics précis, d'un suivi personnalisé, et de conseils médicaux adaptés à vos besoins. Votre bien-être est notre priorité !
                        </p>
                    </div>

                    {/* Section centre : Informations sur l'entreprise */}
                    <div className="col-md-4 mb-4">
                        <h5 className="mb-3">À PROPOS</h5>
                        <ul className="list-unstyled">
                            <li><a href="#home" className="text-light text-decoration-none">Accueil</a></li>
                            <li><a href="#mission" className="text-light text-decoration-none">Notre mission</a></li>
                            <li><a href="#services" className="text-light text-decoration-none">Services</a></li>
                            <li><a href="#testimonials" className="text-light text-decoration-none">Témoignages</a></li>
                        </ul>
                    </div>

                    {/* Section droite : Contact */}
                    <div className="col-md-4 mb-4">
                        <h5 className="mb-3">CONTACTEZ-NOUS</h5>
                        <ul className="list-unstyled">
                            <li>Téléphone : +33 1 23 45 67 89</li>
                            <li>Email : <a href="mailto:support@e-sante.com" className="text-light text-decoration-none">support@e-sante.com</a></li>
                            <li>Adresse : 123 Rue de la Santé, Paris, France</li>
                        </ul>
                    </div>

                </div>

                {/* Ligne de séparation */}
                <hr />

                {/* Mentions légales */}
                <div >
                    <p className="mb-0">
                        &copy; 2024 E-Santé. Tous droits réservés. | <a href="#privacy" className="text-light text-decoration-none">Politique de confidentialité</a>
                    </p>
                </div>
           
        </footer>
    );
};

export default Footer;
