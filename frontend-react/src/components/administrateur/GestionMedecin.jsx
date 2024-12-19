import { useState, useEffect } from "react";
import { Table, Container, Button, Modal, Form } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";

function GestionMedecin() {
  const [personnels, setPersonnels] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPersonnel, setCurrentPersonnel] = useState({
    Id: null,
    nom: "",
    email: "",
    role: "Doctor",
    specialite: "",
  });

  const apiUrl = "/api/User"; // Update this URL with your backend URL

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/medecins`);
        const personnelData = response.data.map((person) => ({
          Id: person.id,
          nom: person.userName,
          email: person.email,
          specialite: person.specialite || "N/A",
        }));
        setPersonnels(personnelData);
      } catch (error) {
        console.error("There was an error fetching the medecins!", error);
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
      role: "Doctor",
      specialite: "",
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPersonnel({ ...currentPersonnel, [name]: value });
  };

  const handleSave = async () => {
    try {
      const payload = {
        userName: currentPersonnel.nom,
        email: currentPersonnel.email,
        password: "defaultPassword123", // Replace or make dynamic if required
        role: currentPersonnel.role,
        licenseNumber: "12345", // Replace with dynamic input if needed
        specialite: currentPersonnel.specialite,
      };

      let response;
      if (currentPersonnel.Id) {
        // Update existing personnel
        response = await axios.put(`${apiUrl}/${currentPersonnel.Id}`, payload);
        setPersonnels((prev) =>
          prev.map((personnel) =>
            personnel.Id === currentPersonnel.Id ? response.data : personnel
          )
        );
      } else {
        // Add new personnel
        response = await axios.post(`${apiUrl}/Create`, payload);
        setPersonnels((prev) => [...prev, response.data]);
      }

      setShowModal(false);
    } catch (error) {
      if (error.response) {
        console.error("Response Error:", error.response.data);
      } else if (error.request) {
        console.error("Request Error:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const handleEdit = (personnel) => {
    setCurrentPersonnel(personnel);
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
      <h2 className="mb-4">Personnel Management</h2>
      <Button variant="primary" className="mb-3" onClick={handleShow}>
        Add Personnel
      </Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Specialty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {personnels.map((personnel) => (
            <tr key={personnel.Id}>
              <td>{personnel.Id}</td>
              <td>{personnel.nom}</td>
              <td>{personnel.email}</td>
              <td>{personnel.specialite}</td>
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
                value={currentPersonnel.nom}
                onChange={handleChange}
                placeholder="Name"
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={currentPersonnel.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </Form.Group>

            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                name="role"
                value={currentPersonnel.role}
                onChange={handleChange}
              >
                <option>Doctor</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formSpecialite">
              <Form.Label>Specialty</Form.Label>
              <Form.Control
                type="text"
                name="specialite"
                value={currentPersonnel.specialite}
                onChange={handleChange}
                placeholder="Specialty"
              />
            </Form.Group>
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
