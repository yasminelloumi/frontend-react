import { useState, useEffect } from "react";
import { Button, Table, Modal, Form, InputGroup, FormControl } from "react-bootstrap";
import axios from "axios";

function OrdonnanceManagement() {
  const [ordonnances, setOrdonnances] = useState([]);
  const [filteredOrdonnances, setFilteredOrdonnances] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentOrdonnance, setCurrentOrdonnance] = useState({
    id: "",
    patientId: "",
    patientName: "",
    medecinName: "",
    medicaments: [], // Initial empty array for medicaments
  });
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch ordonnances data
  const fetchOrdonnances = async () => {
    try {
      const response = await axios.get("/api/Ordonnance");
      setOrdonnances(response.data);
      setFilteredOrdonnances(response.data); // Initially display all ordonnances
    } catch (error) {
      console.error("Error fetching ordonnances:", error);
    }
  };

  useEffect(() => {
    fetchOrdonnances();
  }, []);

  // Search ordonnances (client-side filtering)
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredOrdonnances(ordonnances); // If search is empty, show all ordonnances
      return;
    }

    const filtered = ordonnances.filter(
      (ordonnance) =>
        ordonnance.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ordonnance.medecinName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrdonnances(filtered);
  };

  // Handle modal show
  const handleShowModal = (ordonnance = null) => {
    setEditMode(!!ordonnance);
    setCurrentOrdonnance(
      ordonnance || { id: "", patientId: "", patientName: "", medecinName: "", medicaments: [] }
    );
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentOrdonnance({ id: "", patientId: "", patientName: "", medecinName: "", medicaments: [] });
  };

  // Handle medicaments change
  const handleMedicamentsChange = (e) => {
    const medicamentsInput = e.target.value;

    // If input is empty, reset the medicaments array
    if (!medicamentsInput) {
      setCurrentOrdonnance({
        ...currentOrdonnance,
        medicaments: [], // Reset medicaments array if input is empty
      });
      return;
    }

    // Parse the medicaments input into an array of objects
    const medicamentsArray = medicamentsInput
      .split(",")
      .map((med) => {
        const [medId, quantite] = med.split(":").map((str) => str.trim());

        // Validate that both ID and Quantity are present and Quantity is a number
        if (medId && quantite && !isNaN(quantite)) {
          return {
            medicamentId: medId,
            quantite: parseInt(quantite), // Ensure quantity is a number
          };
        }
        return null; // Return null for invalid entries
      })
      .filter((med) => med !== null); // Filter out invalid entries

    // Update state with the valid medicaments
    setCurrentOrdonnance({
      ...currentOrdonnance,
      medicaments: medicamentsArray,
    });
  };

  // Create Ordonnance (POST request)
  const createOrdonnance = async () => {
    try {
      const response = await axios.post("/api/Ordonnance", currentOrdonnance);
      console.log("Ordonnance created successfully:", response.data);
      fetchOrdonnances(); // Refresh ordonnances list after creation
      handleCloseModal(); // Close the modal after creating the ordonnance
    } catch (error) {
      console.error("Error creating ordonnance:", error);
    }
  };

  return (
    <>
      <h2 className="mt-5 mb-4">Ordonnance Management</h2>

      {/* Search bar */}
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search by patient or doctor"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="primary" onClick={handleSearch}>
          Search
        </Button>
      </InputGroup>

      <Button className="mb-3" onClick={() => handleShowModal()}>
        Add Ordonnance
      </Button>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Medications</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrdonnances.map((ordonnance) => (
            <tr key={ordonnance.id}>
              <td>{ordonnance.id}</td>
              <td>{ordonnance.patientName}</td>
              <td>{ordonnance.medecinName}</td>
              <td>
                {ordonnance.medicaments
                  .map((med) => `ID: ${med.medicamentId} (Quantity: ${med.quantite})`)
                  .join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for adding or editing ordonnance */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Edit Ordonnance" : "Add Ordonnance"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => e.preventDefault()}> {/* Prevent form submission */}
            <Form.Group className="mb-3">
              <Form.Label>Patient ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Patient ID"
                value={currentOrdonnance.patientId}
                onChange={(e) =>
                  setCurrentOrdonnance({
                    ...currentOrdonnance,
                    patientId: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Doctor Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Doctor's Name"
                value={currentOrdonnance.medecinName}
                onChange={(e) =>
                  setCurrentOrdonnance({
                    ...currentOrdonnance,
                    medecinName: e.target.value,
                  })
                }
              />
            </Form.Group>

            {/* Medicaments input field */}
            <Form.Group className="mb-3">
              <Form.Label>Medicaments</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Medicaments (comma-separated ID:Quantity)"
                value={currentOrdonnance.medicaments
                  .map((med) => `${med.medicamentId}:${med.quantite}`)
                  .join(", ")}  // Ensure the value is displayed as a string in the input
                onChange={handleMedicamentsChange} // Call the change handler
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={createOrdonnance}> {/* OnClick triggers POST request */}
            Create Ordonnance
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default OrdonnanceManagement;
