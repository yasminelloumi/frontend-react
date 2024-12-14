import { useState } from "react";
import { Table, Container, Button, Modal, Form } from "react-bootstrap";
import "./Body.css";

function GestionPatients() {
  const [patients, setPatients] = useState([
    {
      ID: 1,
      NamePatient: "John Doe",
      DateOfBirth: "1990-05-15",
    },
    {
      ID: 2,
      NamePatient: "Jane Smith",
      DateOfBirth: "1985-11-25",
    },
    {
      ID: 3,
      NamePatient: "Alice Brown",
      DateOfBirth: "2000-01-05",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentPatient, setCurrentPatient] = useState({
    ID: "",
    NamePatient: "",
    DateOfBirth: "",
  });

  const handleShowModal = (patient = null) => {
    setEditMode(!!patient);
    setCurrentPatient(patient || { ID: "", NamePatient: "", DateOfBirth: "" });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentPatient({
      ID: "",
      NamePatient: "",
      DateOfBirth: "",
    });
  };

  const handleSavePatient = () => {
    if (editMode) {
      setPatients((prev) =>
        prev.map((p) =>
          p.ID === currentPatient.ID ? { ...currentPatient } : p
        )
      );
    } else {
      setPatients((prev) => [
        ...prev,
        { ...currentPatient, ID: prev.length + 1 },
      ]);
    }
    handleCloseModal();
  };

  const handleDeletePatient = (id) => {
    setPatients((prev) => prev.filter((patient) => patient.ID !== id));
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Patient Management</h2>
      <Button className="mb-3 custom-btn" onClick={() => handleShowModal()}>
        Add a patient
      </Button>
      <Table striped bordered hover responsive className="custom-border">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date Of Birth</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.ID}>
              <td>{patient.ID}</td>
              <td>{patient.NamePatient}</td>
              <td>{new Date(patient.DateOfBirth).toLocaleDateString()}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2 custom-btn"
                  onClick={() => handleShowModal(patient)}
                >
                  Update
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  className="custom-btn"
                  onClick={() => handleDeletePatient(patient.ID)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editMode ? "Update a Patient" : "Add a Patient"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nom du patient"
                value={currentPatient.NamePatient}
                onChange={(e) =>
                  setCurrentPatient({
                    ...currentPatient,
                    NamePatient: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date Of Birth</Form.Label>
              <Form.Control
                type="date"
                value={currentPatient.DateOfBirth}
                onChange={(e) =>
                  setCurrentPatient({
                    ...currentPatient,
                    DateOfBirth: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button className="custom-btn" onClick={handleSavePatient}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default GestionPatients;
