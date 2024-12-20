import { useState, useEffect } from "react";
import { Container, Table, Alert, Navbar, Nav, Badge, Modal, Button, Form } from "react-bootstrap";
import { FaBell } from "react-icons/fa"; // Correct import for icons
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function MedicationProvider() {
  const [medications, setMedications] = useState([]);
  const [demandes, setDemandes] = useState([]); // State to hold the list of demands
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [validatedDemandes, setValidatedDemandes] = useState([]); // State to hold the validated demands

  // Fetch medications on component mount
  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const response = await axios.get("/api/Fournisseur");
        if (response.data.length === 0) {
          setErrorMessage("No medications found.");
        } else {
          setMedications(response.data);
        }
      } catch (error) {
        setErrorMessage("Error fetching medications. Please try again later.");
      }
    };
    fetchMedications();
  }, []);

  // Fetch demands only when the modal is opened
  const fetchDemandes = async () => {
    try {
      const response = await axios.get("/api/Demandes");
      if (response.data.length === 0) {
        setErrorMessage("No demands found.");
      } else {
        setDemandes(response.data);
      }
    } catch (error) {
      setErrorMessage("Error fetching demands. Please try again later.");
    }
  };

  const handleModalOpen = () => {
    fetchDemandes(); // Fetch demands when the modal opens
    setShowModal(true);
  };

  const handleValidateClick = () => {
    // Here, we prepare the validated demands for display in the form modal
    setValidatedDemandes(demandes); // Set all demands for validation
    setShowFormModal(true); // Show the form modal to display validated demands
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Example of processing the validated demands
    console.log("Validating all demands:", validatedDemandes);

    // Assuming you want to send the validated demands to the backend or update their status
    axios.post("/api/Fournisseur/traiter", validatedDemandes)
      .then(response => {
        console.log("Validation successful:", response);
        setShowFormModal(false); // Close the modal after submitting
        setDemandes([]); // Clear the demands after validation
      })
      .catch(error => {
        console.error("Error validating demands:", error);
        setErrorMessage("Error validating demands. Please try again later.");
      });
  };

  return (
    <div>
      {/* Navbar with Notification Icon */}
      <Navbar bg="light" expand="lg" className="mb-4 shadow-sm">
        <Container>
          <Navbar.Brand>Pharmacy Management</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link onClick={handleModalOpen}>
              <FaBell size={24} />
              {demandes.length > 0 && (
                <Badge bg="danger" className="ms-1">
                  {demandes.length}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Alert Message */}
      {errorMessage && (
        <Alert variant="danger" className="text-center">
          {errorMessage}
        </Alert>
      )}

      {/* Medication Database Table */}
      <Container className="mb-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {medications.map((med) => (
              <tr key={med.id}>
                <td>{med.id}</td>
                <td>{med.name}</td>
                <td>{med.description}</td>
                <td>{med.prix} DT</td>
                <td>{med.qttStock}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {/* Modal to display list of demands */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Demandes List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {demandes.length > 0 ? (
            <>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Medicament ID</th>
                    <th>Quantité</th>
                    <th>Statut</th>
                    <th>Date Demande</th>
                  </tr>
                </thead>
                <tbody>
                  {demandes.map((demande) => (
                    <tr key={demande.id}>
                      <td>{demande.id}</td>
                      <td>{demande.medicamentId}</td>
                      <td>{demande.quantite}</td>
                      <td>{demande.statut}</td>
                      <td>{new Date(demande.dateDemande).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button variant="primary" onClick={handleValidateClick}>
                Validate All Demands
              </Button>
            </>
          ) : (
            <p>No demands available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for the form to show all validated demands */}
      <Modal show={showFormModal} onHide={() => setShowFormModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Validate All Demandes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {validatedDemandes.length > 0 ? (
            <>
              <p>The following demands will be validated:</p>
              <Form>
                {validatedDemandes.map((demande, index) => (
                  <div key={demande.id}>
                    <h5>Demand {index + 1}</h5>
                    <Form.Group className="mb-3">
                      <Form.Label>Medicament ID</Form.Label>
                      <Form.Control type="text" value={demande.medicamentId} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Quantité</Form.Label>
                      <Form.Control type="number" value={demande.quantite} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Statut</Form.Label>
                      <Form.Control type="text" value={demande.statut} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Date Demande</Form.Label>
                      <Form.Control type="text" value={new Date(demande.dateDemande).toLocaleString()} disabled />
                    </Form.Group>
                    <hr />
                  </div>
                ))}
              </Form>
            </>
          ) : (
            <p>No demands to validate.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFormModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFormSubmit}>
            Submit All
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Style CSS */}
      <style>{`
        /* Adjust modal size */
        .modal-lg {
          max-width: 80%;
        }

        /* Limit modal body height */
        .modal-body {
          max-height: 500px;
          overflow-y: auto;
        }

        /* Custom styling for table and headers */
        table {
          text-align: center;
        }

        th {
          background-color: #f8f9fa;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}

export default MedicationProvider;
