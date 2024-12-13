import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import './Body.css';

const Body = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleNavigation = (path) => {
    navigate(path); // Use navigate to go to the given path
  };

  return (
    <>
      {/* Header Section */}

      {/* Section des cartes */}
      <div className="w-100 d-flex justify-content-center py-5">
        <div className="row w-100 row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {/* Carte Patient */}
          <div className="col">
            <Card className="h-100 shadow-box">
              <Card.Img
                variant="top"
                src="https://media.istockphoto.com/id/1217755212/fr/vectoriel/pharmacien.jpg?s=612x612&w=0&k=20&c=H-DOLy92x4QmyXnmTz88rXIksVmjpCdO3bLSmfaA3w4="
                alt="Patient"
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>Patient</Card.Title>
                <Card.Text>
                  Accédez à votre espace personnel et gérez vos informations
                  médicales.
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handleNavigation("/ListePatient")}
                >
                  Accéder
                </Button>
              </Card.Body>
            </Card>
          </div>

          {/* Carte Médecin */}
          <div className="col">
            <Card className="h-100 shadow-box">
              <Card.Img
                variant="top"
                src="https://static.vecteezy.com/ti/vecteur-libre/p1/7686631-personnel-medical-de-medecins-et-infirmiers-groupe-de-medecins-vecteur-plat-cartoon-illustraiton-gratuit-vectoriel.jpg"
                alt="Médecin"
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>Médecin</Card.Title>
                <Card.Text>
                  Connectez-vous pour consulter vos patients et leurs dossiers.
                </Card.Text>
                <Button
                  variant="success"
                  onClick={() => handleNavigation("/MedecinListe")}
                >
                  Accéder
                </Button>
              </Card.Body>
            </Card>
          </div>

          {/* Carte Médicament */}
          <div className="col">
            <Card className="h-100 shadow-box">
              <Card.Img
                variant="top"
                src="https://static.vecteezy.com/ti/vecteur-libre/p1/11854465-modele-de-pharmacie-magasin-d-illustration-plat-dessin-anime-dessine-a-la-main-pour-la-vente-de-medicaments-un-pharmacien-des-medicaments-des-capsules-et-une-bouteille-vectoriel.jpg"
                alt="Médicament"
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>Médicament</Card.Title>
                <Card.Text>
                  Recherchez des informations détaillées sur les médicaments.
                </Card.Text>
                <Button
                  variant="info"
                  onClick={() => handleNavigation("/ListeMedicament")}
                >
                  Accéder
                </Button>
              </Card.Body>
            </Card>
          </div>

          {/* Carte Ordonnance */}
          <div className="col">
            <Card className="h-100 shadow-box">
              <Card.Img
                variant="top"
                src="https://us.123rf.com/450wm/dilendom/dilendom2003/dilendom200300007/141590755-image-vectorielle-isom%C3%A9trique-sur-fond-bleu-le-m%C3%A9decin-remplit-un-formulaire-de-prescription.jpg?ver=6"
                alt="Ordonnance"
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>Ordonnance</Card.Title>
                <Card.Text>
                  Générez et consultez vos ordonnances électroniques.
                </Card.Text>
                <Button
                  variant="warning"
                  onClick={() => handleNavigation("/ListeOrdonnance")}
                >
                  Accéder
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>

      
      
    </>
  );
};

export default Body;
