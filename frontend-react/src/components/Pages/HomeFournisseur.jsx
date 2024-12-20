import React from "react";
import HomeBackground from "../../assets/téléchargement.png";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./OverlapStructure.css";

const HomeFournisseur = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleNavigation = (path) => {
    navigate(path); // Use navigate to go to the given path
  };

  return (
    <div>
      {/* Header Section */}
      <div
        style={{
          height: "50vh", // Adjust height of the header
          background: `url(${HomeBackground}) no-repeat center center`, // Set background image
          backgroundSize: "cover", // Ensure the image covers the entire header
          position: "relative",
          borderRadius: "15px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <h2
            style={{
              fontWeight: "400",
              fontSize: "3vw",
              textShadow: "2px 2px 5px rgba(0,0,0,0.5)",
              color: "#058190", // Updated vibrant red-orange color
            }}
          >
            Welcome To our Platform!
          </h2>
          <p
            style={{
              fontSize: "1.5vw",
              textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
              color: "#058190", // Updated golden yellow color
            }}
          >
            Choose an Option:
          </p>
        </div>
      </div>

      {/* Overlapping Cards Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          marginTop: "-100px", // Create the overlap effect
          paddingBottom: "3rem",
          zIndex: 1,
          position: "relative",
        }}
      >
        {/* Medication List Card */}
        <Card className="shadow-box" style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src="https://static.vecteezy.com/ti/vecteur-libre/p1/11854465-modele-de-pharmacie-magasin-d-illustration-plat-dessin-anime-dessine-a-la-main-pour-la-vente-de-medicaments-un-pharmacien-des-medicaments-des-capsules-et-une-bouteille-vectoriel.jpg"
            style={{ height: "150px", objectFit: "cover" }}
          />
          <Card.Body>
            <Card.Title>Medications List</Card.Title>
            <Card.Text>Search for detailed information about medications.</Card.Text>
            <Button variant="info" onClick={() => handleNavigation("/MedicationProvider")}>
              Access
            </Button>
          </Card.Body>
        </Card>

        {/* Medications Requests List Card */}
        <Card className="shadow-box" style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src="https://us.123rf.com/450wm/dilendom/dilendom2003/dilendom200300007/141590755-image-vectorielle-isom%C3%A9trique-sur-fond-bleu-le-m%C3%A9decin-remplit-un-formulaire-de-prescription.jpg?ver=6"
            style={{ height: "150px", objectFit: "cover" }}
          />
          <Card.Body>
            <Card.Title>Medications Requests List</Card.Title>
            <Card.Text>View and manage medication requests.</Card.Text>
            <Button variant="warning" onClick={() => handleNavigation("/MedicationProvider")}>
              Access
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default HomeFournisseur;
