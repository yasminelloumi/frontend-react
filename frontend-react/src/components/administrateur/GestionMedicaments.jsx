import React, { useState, useEffect } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

function MedicamentManagement() {
  const [medicaments, setMedicaments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedMedicament, setSelectedMedicament] = useState(null);


  // Fetch all medicaments
  useEffect(() => {
    fetchMedicaments();
  }, []);

  const fetchMedicaments = async () => {
    try {
      const response = await axios.get("/api/Medicament");
      setMedicaments(response.data);
    } catch (error) {
      console.error("Error fetching medicaments:", error);
    }
  };

  const searchMedicaments = async () => {
    try {
      const response = await axios.get(`/api/Medicament/search?searchTerm=${searchTerm}`);
      setMedicaments(response.data);
    } catch (error) {
      console.error("Error searching medicaments:", error);
    }
  };

  const handleEdit = (medicament) => {
    setSelectedMedicament(medicament);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this medicament?")) {
      try {
        await axios.delete(`/api/Medicament/${id}`);
        fetchMedicaments(); // Refresh the list
      } catch (error) {
        console.error("Error deleting medicament:", error);
      }
    }
  };

  const handleSubmit = async () => {
    if (selectedMedicament.id) {
      // Update medicament
      try {
        await axios.put(`/api/Medicament/${selectedMedicament.id}`, selectedMedicament);
        fetchMedicaments();
        setShowModal(false);
      } catch (error) {
        console.error("Error updating medicament:", error);
      }
    } else {
      // Create new medicament
      try {
        await axios.post("/api/Medicament", selectedMedicament);
        fetchMedicaments();
        setShowModal(false);
      } catch (error) {
        console.error("Error creating medicament:", error);
      }
    }
  };

  return (
    <div>
      <h2>Medicament Management</h2>
      <div className="d-flex mb-3">
        <Form.Control
          type="text"
          placeholder="Search medicaments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={searchMedicaments} className="ms-2">
          <FaSearch /> Search
        </Button>
        <Link to="/Medicamentt" className="btn btn-primary ms-2">
          <FaSearch /> Alerte
        </Link>
      </div>
      <Button onClick={() => setShowModal(true)}>Add New Medicament</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicaments.map((med) => (
            <tr key={med.id}>
              <td>{med.name}</td>
              <td>{med.description}</td>
              <td>{med.prix}</td>
              <td>{med.qttStock}</td>
              <td>
                <FaEdit
                  style={{ cursor: "pointer", color: "orange", marginRight: "10px" }}
                  onClick={() => handleEdit(med)}
                />
                <FaTrashAlt
                  style={{ cursor: "pointer", color: "red" }}
                  onClick={() => handleDelete(med.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for adding/editing medicaments */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedMedicament?.id ? "Edit Medicament" : "Add Medicament"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={selectedMedicament?.name || ""}
                onChange={(e) =>
                  setSelectedMedicament({ ...selectedMedicament, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={selectedMedicament?.description || ""}
                onChange={(e) =>
                  setSelectedMedicament({ ...selectedMedicament, description: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={selectedMedicament?.prix || ""}
                onChange={(e) =>
                  setSelectedMedicament({ ...selectedMedicament, prix: parseFloat(e.target.value) })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Stock Quantity</Form.Label>
              <Form.Control
                type="number"
                value={selectedMedicament?.qttStock || ""}
                onChange={(e) =>
                  setSelectedMedicament({ ...selectedMedicament, qttStock: parseInt(e.target.value) })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MedicamentManagement;
