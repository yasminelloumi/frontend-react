import { useState, useEffect } from "react";
import { Table, Container, Modal, Form, Button } from "react-bootstrap";
import axios from "axios";

function GestionMedecin() {
  const [userName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialite, setSpecialite] = useState("");
  const [licenseNumber, setLicenseNumber] = useState(""); // Track license number
  const [role, setRole] = useState("medecin");

  const [personnels, setPersonnels] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPersonnel, setCurrentPersonnel] = useState({
    Id: null,
    nom: "",
    email: "",
    role: "medecin",
    specialite: "",
    licenseNumber: "",
  });

  const apiUrl = "/api/User";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/pharmaciens`); // Assuming you want to fetch pharmacists
        const personnelData = response.data.map((person) => ({
          Id: person.id,
          nom: person.userName,
          email: person.email,
          licenseNumber: person.licenseNumber || "N/A", // Show license number instead of speciality
        }));
        setPersonnels(personnelData);
      } catch (error) {
        console.error("There was an error fetching the pharmaciens!", error);
      }
    };
    fetchUsers();
  }, []);

  const handleClose = () => setShowModal(false);

  const handleShow = () => {
    setCurrentPersonnel({
      Id: null,
      nom: "",
      email: "",
      role: "medecin",
      specialite: "",
      licenseNumber: "", // Reset license number
    });
    setName("");
    setEmail("");
    setPassword("");
    setSpecialite("");
    setLicenseNumber(""); // Reset license number
    setRole("medecin");
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const data = {
        UserName: userName,
        Email: email,
        Password: password,
        Role: role,
        LicenseNumber: role === "pharmacien" ? licenseNumber : "", // Only include license number for pharmacien
        Specialite: role === "medecin" ? specialite : "", // Only include speciality for medecin
      };

      if (currentPersonnel.Id) {
        // Edit existing personnel
        await axios.put(`${apiUrl}/${currentPersonnel.Id}`, data);
        setPersonnels((prev) =>
          prev.map((personnel) =>
            personnel.Id === currentPersonnel.Id
              ? { ...personnel, nom: userName, email, licenseNumber }
              : personnel
          )
        );
      } else {
        // Add new personnel
        const url = "/api/user/Create User";
        const response = await axios.post(url, data);
        setPersonnels((prev) => [
          ...prev,
          {
            Id: response.data.id,
            nom: userName,
            email: email,
            licenseNumber: role === "pharmacien" ? licenseNumber : "N/A", // Add license number for pharmacien
          },
        ]);
      }

      setShowModal(false);
    } catch (error) {
      console.error("Error saving personnel:", error);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">List of Pharmaciens</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>License Number</th> {/* Change to License Number */}
          </tr>
        </thead>
        <tbody>
          {personnels.map((personnel) => (
            <tr key={personnel.Id}>
              <td>{personnel.Id}</td>
              <td>{personnel.nom}</td>
              <td>{personnel.email}</td>
              <td>{personnel.licenseNumber}</td> {/* Display license number */}
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentPersonnel.Id ? "Edit" : "Add"} Personnel
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNom">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="nom"
                value={userName}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </Form.Group>

            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="medecin">Doctor</option>
                <option value="pharmacien">Pharmacien</option>
                <option value="fournisseur">Fournisseur</option>
                <option value="admin">Admin</option>
              </Form.Control>
            </Form.Group>

            {role === "pharmacien" && (
              <Form.Group controlId="formLicenseNumber">
                <Form.Label>License Number</Form.Label>
                <Form.Control
                  type="text"
                  name="licenseNumber"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  placeholder="License Number"
                />
              </Form.Group>
            )}

            {role === "medecin" && (
              <Form.Group controlId="formSpecialite">
                <Form.Label>Speciality</Form.Label>
                <Form.Control
                  type="text"
                  name="specialite"
                  value={specialite}
                  onChange={(e) => setSpecialite(e.target.value)}
                  placeholder="Speciality"
                />
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default GestionMedecin;
