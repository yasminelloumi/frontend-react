import { useState, useEffect } from "react";
import { Table, Modal, Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

function PatientManagement() {
  const [patients, setPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentPatient, setCurrentPatient] = useState({
    ID: "",
    NamePatient: "",
    DateOfBirth: "",
  });
  const [searchTerm, setSearchTerm] = useState(""); // Term for search

  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:5026/api/Patient");
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleShowModal = (patient = null) => {
    setEditMode(!!patient);
    setCurrentPatient(patient || { id: "", namePatient: "", dateOfBirth: "" });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentPatient({ id: "", namePatient: "", dateOfBirth: "" });
  };

  const handleSavePatient = async () => {
    try {
      if (editMode) {
        await axios.put(`http://localhost:5026/api/Patient/${currentPatient.id}`, currentPatient);
      } else {
        await axios.post("http://localhost:5026/api/Patient", currentPatient);
      }
      fetchPatients();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving patient:", error);
    }
  };

  const handleDeletePatient = async (id) => {
    try {
      await axios.delete(`http://localhost:5026/api/Patient/${id}`);
      fetchPatients();
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  // Search patients
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      alert("Please enter a valid search term.");
      return;
    }
  
    try {
      const response = await axios.get(`http://localhost:5026/api/Patient/search?searchTerm=${searchTerm}`);
      setPatients(response.data); // Update patients with search results
    } catch (error) {
      console.error("Error searching patients:", error);
      if (error.response && error.response.status === 404) {
        setPatients([]); // Clear the patient list if no results are found
      }
    }
  };
  

  return (
    <>
      <h2 className="mt-5 mb-4">Patient Management</h2>

      {/* Search bar */}
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search by name or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="primary" onClick={handleSearch}>
          Search
        </Button>
      </InputGroup>

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
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.namePatient}</td>
              <td>{new Date(patient.dateOfBirth).toLocaleDateString()}</td>
              <td>
                <FaEdit
                  style={{ cursor: "pointer", color: "turquoise", marginRight: 10 }}
                  onClick={() => handleShowModal(patient)}
                />
                
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Edit Patient" : "Add Patient"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Patient's Name"
                value={currentPatient.namePatient}
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
                value={currentPatient.dateOfBirth}
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