import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Body = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleNavigation = (path) => {
    navigate(path); // Use navigate to go to the given path
  };

  return (
    <>
      <div className="container vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
        
        {/* Card section */}
        <div className="w-100 d-flex justify-content-center py-5">
          <div className="row w-100 row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {/* Patient Card */}
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
                    Access your personal space and manage your medical information.
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => handleNavigation("/GestionPatients")}
                  >
                    Access
                  </Button>
                </Card.Body>
              </Card>
            </div>

            {/* Personnel Card */}
            <div className="col">
              <Card className="h-100 shadow-box">
                <Card.Img
                  variant="top"
                  src="https://static.vecteezy.com/ti/vecteur-libre/p1/7686631-personnel-medical-de-medecins-et-infirmiers-groupe-de-medecins-vecteur-plat-cartoon-illustraiton-gratuit-vectoriel.jpg"
                  alt="Personnel"
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>Personnel</Card.Title>
                  <Card.Text>
                    Log in to view your patients and their records.
                  </Card.Text>
                  <Button
                    variant="success"
                    onClick={() => handleNavigation("/GestionPersonnel")}
                  >
                    Access
                  </Button>
                </Card.Body>
              </Card>
            </div>

            {/* Medication Card */}
            <div className="col">
              <Card className="h-100 shadow-box">
                <Card.Img
                  variant="top"
                  src="https://static.vecteezy.com/ti/vecteur-libre/p1/11854465-modele-de-pharmacie-magasin-d-illustration-plat-dessin-anime-dessine-a-la-main-pour-la-vente-de-medicaments-un-pharmacien-des-medicaments-des-capsules-et-une-bouteille-vectoriel.jpg"
                  alt="Medication"
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>Medication</Card.Title>
                  <Card.Text>
                    Search for detailed information about medications.
                  </Card.Text>
                  <Button
                    variant="info"
                    onClick={() => handleNavigation("/MedicamentManagement")}
                  >
                    Access
                  </Button>
                </Card.Body>
              </Card>
            </div>

            {/* Prescription Card */}
            <div className="col">
              <Card className="h-100 shadow-box">
                <Card.Img
                  variant="top"
                  src="https://us.123rf.com/450wm/dilendom/dilendom2003/dilendom200300007/141590755-image-vectorielle-isom%C3%A9trique-sur-fond-bleu-le-m%C3%A9decin-remplit-un-formulaire-de-prescription.jpg?ver=6"
                  alt="Prescription"
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>Prescription</Card.Title>
                  <Card.Text>
                    Generate and view your electronic prescriptions.
                  </Card.Text>
                  <Button
                    variant="warning"
                    onClick={() => handleNavigation("/AjouterOrdonnance")}
                  >
                    Access
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Body;
