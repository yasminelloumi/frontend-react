import { useState } from "react";
import { Table, Modal, Form, Button } from "react-bootstrap"; // Importer Button de react-bootstrap
import { FaEdit, FaTrash } from "react-icons/fa";  // Importer les icônes

function PatientManagement() {
  // Liste initiale de patients
  const [patients, setPatients] = useState([
    {
      ID: 1,
      NamePatient: "John Doe",
      DateOfBirth: "1990-05-15",
      MedicalHistory: "Hypertension, Diabetes",
    },
    {
      ID: 2,
      NamePatient: "Jane Smith",
      DateOfBirth: "1985-11-25",
      MedicalHistory: "Asthma",
    },
    {
      ID: 3,
      NamePatient: "Alice Brown",
      DateOfBirth: "2000-01-05",
      MedicalHistory: "No significant history",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentPatient, setCurrentPatient] = useState({
    ID: "",
    NamePatient: "",
    DateOfBirth: "",
  });

  // Open modal to add or edit a patient
  const handleShowModal = (patient = null) => {
    setEditMode(!!patient); // If a patient is passed, it's edit mode
    setCurrentPatient(
      patient || { ID: "", NamePatient: "", DateOfBirth: "" } // Medical history removed
    );
    setShowModal(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentPatient({
      ID: "",
      NamePatient: "",
      DateOfBirth: "",
    });
  };

  // Add or edit a patient
  const handleSavePatient = () => {
    if (editMode) {
      // Edit mode: Update an existing patient
      setPatients((prev) =>
        prev.map((p) =>
          p.ID === currentPatient.ID ? { ...currentPatient } : p
        )
      );
    } else {
      // Add mode: Add a new patient
      setPatients((prev) => [
        ...prev,
        { ...currentPatient, ID: prev.length + 1 },
      ]);
    }
    handleCloseModal();
  };

  // Delete a patient
  const handleDeletePatient = (id) => {
    setPatients((prev) => prev.filter((patient) => patient.ID !== id));
  };

  return (
    <>
      <h2 className="mt-5 mb-4">Patient Management</h2>
      <Button className="mb-3" onClick={() => handleShowModal()}>
        Add Patient
      </Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date of Birth</th>
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
                <FaEdit
                  style={{ cursor: "pointer", color: "turquoise", marginRight: 10 }}
                  onClick={() => handleShowModal(patient)}
                />
                <FaTrash
                  style={{ cursor: "pointer", color: "turquoise" }}
                  onClick={() => handleDeletePatient(patient.ID)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal to add or edit a patient */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editMode ? "Edit Patient" : "Add Patient"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Patient's Name"
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
              <Form.Label>Date of Birth</Form.Label>
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
          <Button variant="primary" onClick={handleSavePatient}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PatientManagement;
