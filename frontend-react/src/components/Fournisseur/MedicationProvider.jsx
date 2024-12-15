import { useState } from "react";
import { Container, Table, Alert, Navbar, Nav, Badge, Modal } from "react-bootstrap";
import { FaBell, FaCheck } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';

function MedicationProvider() {
  const [medications, setMedications] = useState([
    { id: 1, name: "Paracetamol", description: "Pain Relief", price: 5, stock: 100 },
    { id: 2, name: "Amoxicillin", description: "Antibiotics", price: 10, stock: 50 },
    { id: 3, name: "Ibuprofen", description: "Pain Relief", price: 7, stock: 30 },
    { id: 4, name: "Insulin", description: "Diabetes", price: 20, stock: 20 },
  ]);

  const [requests, setRequests] = useState([
    { id: 1, name: "Paracetamol", requestDate: "2024-12-14", quantity: 20, price: 5 },
    { id: 2, name: "Amoxicillin", requestDate: "2024-12-13", quantity: 10, price: 10 },
  ]);

  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleAcceptRequest = (requestId) => {
    // Find the request and corresponding medication
    const request = requests.find((req) => req.id === requestId);
    const medicationIndex = medications.findIndex((med) => med.name === request.name);

    // Update the stock of the medication
    if (medicationIndex !== -1) {
      const updatedMedications = [...medications];
      updatedMedications[medicationIndex].stock -= request.quantity;
      setMedications(updatedMedications);
    }

    // Remove the accepted request
    setRequests(requests.filter((request) => request.id !== requestId));

    // Display confirmation message
    setConfirmationMessage("The medication request has been accepted and processed successfully.");
    setTimeout(() => setConfirmationMessage(""), 5000); // Hide message after 5 seconds
  };

  return (
    <div>
      {/* Notification Icon */}
      <Navbar bg="light" expand="lg" className="mb-4 shadow-sm">
        <Container>
          <Navbar.Brand>Pharmacy Management</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link onClick={() => setShowModal(true)}>
              <FaBell size={24} />
              {requests.length > 0 && (
                <Badge bg="danger" className="ms-1">
                  {requests.length}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Confirmation message */}
      {confirmationMessage && (
        <Alert variant="success" className="text-center">
          {confirmationMessage}
        </Alert>
      )}

      {/* Medication Database */}
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
                <td>{med.price} USD</td>
                <td>{med.stock}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {/* Medication Requests in Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg" // Agrandit la fenêtre du modal
        centered // Centre le modal
      >
        <Modal.Header closeButton>
          <Modal.Title>Medication Requests</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Medication Name</th>
                <th>Request Date</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id}>
                  <td>{request.id}</td>
                  <td>{request.name}</td>
                  <td>{request.requestDate}</td>
                  <td>{request.quantity}</td>
                  <td>{request.price} USD</td>
                  <td>
                    <button
                      style={{ border: "none", background: "transparent" }}
                      onClick={() => handleAcceptRequest(request.id)}
                    >
                      <FaCheck size={24} color="green" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>

      {/* Style CSS intégré */}
      <style>{`
        /* Agrandit la taille du modal */
        .modal-lg {
          max-width: 80%; /* Ajuste la largeur maximale */
        }

        /* Limite la hauteur du corps du modal et ajoute un défilement */
        .modal-body {
          max-height: 500px;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
}

export default MedicationProvider;
