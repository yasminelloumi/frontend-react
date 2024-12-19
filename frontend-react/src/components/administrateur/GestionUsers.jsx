import { useState, useEffect } from "react";
import { Table, Container, Button, Modal, Form } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";

function GestionUsers() {
  const [userName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialite, setSpecialite] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [role, setRole] = useState("medecin");

  const [personnels, setPersonnels] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPersonnel, setCurrentPersonnel] = useState({
    Id: null,
    nom: "",
    email: "",
    role: "medecin",
    specialite: "",
  });

  const apiUrl = "/api/User";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/List Of Users`);
        const personnelData = response.data.map((person) => ({
          Id: person.id,
          nom: person.userName,
          email: person.email,
          specialite: person.specialite || "N/A",
          role: person.role,
        }));
        setPersonnels(personnelData);
      } catch (error) {
        console.error("There was an error fetching the users!", error);
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
    });
    setName("");
    setEmail("");
    setPassword("");
    setSpecialite("");
    setLicenseNumber("");
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
        LicenseNumber: role === "pharmacien" ? licenseNumber : "",
        Specialite: role === "medecin" ? specialite : "",
      };

      if (currentPersonnel.Id) {
        // Edit existing personnel
        await axios.put(`${apiUrl}/${currentPersonnel.Id}`, data);
        setPersonnels((prev) =>
          prev.map((personnel) =>
            personnel.Id === currentPersonnel.Id
              ? { ...personnel, nom: userName, email, specialite, role }
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
            specialite: role === "medecin" ? specialite : "N/A",
            role: role,
          },
        ]);
      }

      setShowModal(false);
    } catch (error) {
      console.error("Error saving personnel:", error);
    }
  };

  const handleEdit = (personnel) => {
    setCurrentPersonnel(personnel);
    setName(personnel.nom);
    setEmail(personnel.email);
    setRole(personnel.role);
    setSpecialite(personnel.specialite);
    setShowModal(true);
  };

  const handleDelete = async (email) => {
    try {
      await axios.delete(`${apiUrl}/${email}`);
      setPersonnels((prev) =>
        prev.filter((personnel) => personnel.email !== email)
      );
    } catch (error) {
      console.error("Error deleting personnel:", error);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">List Of Users</h2>
      <Button variant="primary" className="mb-3" onClick={handleShow}>
        Add User
      </Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {personnels.map((personnel) => (
            <tr key={personnel.Id}>
              <td>{personnel.Id}</td>
              <td>{personnel.nom}</td>
              <td>{personnel.email}</td>
              <td>{personnel.role}</td>
              <td>
                <Button
                  variant="link"
                  className="text-info p-0"
                  onClick={() => handleEdit(personnel)}
                >
                  <FaEdit size={20} />
                </Button>
                <Button
                  variant="link"
                  className="text-danger p-0 ml-2"
                  onClick={() => handleDelete(personnel.email)}
                >
                  <FaTrashAlt size={20} />
                </Button>
              </td>
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

            {/* Only show password field when adding a new user */}
            {!currentPersonnel.Id && (
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
            )}

            {/* Only show role selection when adding new personnel */}
            {!currentPersonnel.Id && (
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
            )}

            {/* Show these fields only if creating a new user */}
            {role === "medecin" && currentPersonnel.Id === null && (
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

            {role === "pharmacien" && currentPersonnel.Id === null && (
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

export default GestionUsers;
