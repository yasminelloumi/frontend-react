import { Card, Button } from "react-bootstrap"; // Ensure Card is imported from react-bootstrap

function PersonnelManagement() {
  // Example for handling navigation
  const handleNavigation = (path) => {
    // Assuming this redirects to a different page. You can use React Router for navigation
    window.location.href = path;
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        paddingTop: "0",
        paddingBottom: "3rem",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div className="row w-100 row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {/* Pharmacien Card */}
        <div className="col d-flex justify-content-center">
          <Card className="h-100 shadow-box" style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://media.istockphoto.com/id/1217755212/fr/vectoriel/pharmacien.jpg?s=612x612&w=0&k=20&c=H-DOLy92x4QmyXnmTz88rXIksVmjpCdO3bLSmfaA3w4="
              alt="Pharmacien"
              style={{ height: "200px", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title>Pharmacien</Card.Title>
              <Card.Text>
                Access your personal space and manage your medical information.
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => handleNavigation("/GestionPharmacien")}
              >
                Access
              </Button>
            </Card.Body>
          </Card>
        </div>

        {/* Medecin Card */}
        <div className="col d-flex justify-content-center">
          <Card className="h-100 shadow-box" style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://static.vecteezy.com/ti/vecteur-libre/p1/7686631-personnel-medical-de-medecins-et-infirmiers-groupe-de-medecins-vecteur-plat-cartoon-illustraiton-gratuit-vectoriel.jpg"
              alt="Medecin"
              style={{ height: "200px", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title>Medecin</Card.Title>
              <Card.Text>
                Log in to consult your patients and their records.
              </Card.Text>
              <Button
                variant="success"
                onClick={() => handleNavigation("/GestionMedecin")}
              >
                Access
              </Button>
            </Card.Body>
          </Card>
        </div>

        {/* All Users Card */}
        <div className="col d-flex justify-content-center">
          <Card className="h-100 shadow-box" style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="/src/assets/Users.jpg" // Placeholder image
              alt="All Users"
              style={{ height: "200px", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title>All Users</Card.Title>
              <Card.Text>Manage access for all users in the system.</Card.Text>
              <Button
                variant="warning"
                onClick={() => handleNavigation("/GestionUsers")}
              >
                Access
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PersonnelManagement;
