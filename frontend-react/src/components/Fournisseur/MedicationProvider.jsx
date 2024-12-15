import { useState } from "react";
import { Container, Table, Button, Alert, Navbar, Nav, Badge } from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
function MedicationProvider() {
  // Dummy database of medications
  const [medications] = useState([
    { id: 1, name: "Paracetamol", category: "Pain Relief", type: "Tablet", stock: 100 },
    { id: 2, name: "Amoxicillin", category: "Antibiotics", type: "Capsule", stock: 50 },
    { id: 3, name: "Ibuprofen", category: "Pain Relief", type: "Syrup", stock: 30 },
    { id: 4, name: "Insulin", category: "Diabetes", type: "Injection", stock: 20 },
  ]);

  // Medication requests
  const [requests, setRequests] = useState([
    { id: 1, name: "Paracetamol", requestDate: "2024-12-14", quantity: 20 },
    { id: 2, name: "Amoxicillin", requestDate: "2024-12-13", quantity: 10 },
  ]);

  // Confirmation message
  const [confirmationMessage, setConfirmationMessage] = useState("");

  // Handle medication request acceptance
  const handleAcceptRequest = (requestId) => {
    setRequests(requests.filter((request) => request.id !== requestId));
    setConfirmationMessage("The medication request has been accepted and processed successfully.");
    setTimeout(() => setConfirmationMessage(""), 3000); // Hide message after 3 seconds
  };

  return (
    <div>
      {/* Notification Icon */}
      <Navbar bg="light" expand="lg" className="mb-4 shadow-sm">
        <Container>
          <Navbar.Brand>Pharmacy Management</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link>
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
        <h2 className="mb-4 text-center">Medication Database</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Type</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {medications.map((med) => (
              <tr key={med.id}>
                <td>{med.id}</td>
                <td>{med.name}</td>
                <td>{med.category}</td>
                <td>{med.type}</td>
                <td>{med.stock}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {/* Medication Requests */}
      <Container>
        <h2 className="mb-4 text-center">Medication Requests</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Medication Name</th>
              <th>Request Date</th>
              <th>Quantity</th>
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
                <td>
                  <Button
                    variant="success"
                    onClick={() => handleAcceptRequest(request.id)}
                  >
                    Accept
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default MedicationProvider;
