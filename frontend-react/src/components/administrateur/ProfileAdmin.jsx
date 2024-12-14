import { useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
function AdminProfile() {
  // Simulating the admin profile data
  const [adminProfile] = useState({
    name: "Admin User",
    email: "admin@example.com",
    role: "Administrator",
  });

  const navigate = useNavigate(); // Initialize navigate function

  // Define the handleBack function
  const handleBack = () => {
    navigate("/"); // Navigate back to the home page or another desired route
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Espace Profil Admin</h2>
      <Card>
        <Card.Body>
          <Card.Title>Name: {adminProfile.name}</Card.Title>
          <Card.Text>Email: {adminProfile.email}</Card.Text>
          <Card.Text>Role: {adminProfile.role}</Card.Text>
          <Button variant="primary">Update  Profil</Button>
          <Button variant="secondary" onClick={handleBack} className="ms-3">Back</Button> {/* Add a button to go back */}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AdminProfile;
