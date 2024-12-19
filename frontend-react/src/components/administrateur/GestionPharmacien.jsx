import { useState, useEffect } from 'react';
import { Table, Container, Button, Modal, Form } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Import des icônes
import axios from 'axios';

function GestionMedecin
() {
  const [personnels, setPersonnels] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPersonnel, setCurrentPersonnel] = useState({
    Id: null,
    nom: '',
   
    role: 'Doctor',
    specialite: '',
    licenseNumber: '',
  });

  const apiUrl = '/api/user'; // Update this URL with your backend URL

  // Fetch all users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/List Of Users`);
        const personnelData = response.data.map((person) => ({
          Id: person.id,
          nom: person.userName,  // Assuming userName is the name (you can adjust as needed)
         
          role: person.role,
     
          licenseNumber: person.licenseNumber || '', // Modify as needed
        }));
        setPersonnels(personnelData);
      } catch (error) {
        console.error("There was an error fetching the users!", error);
      }
    };
    fetchUsers();
  }, []);
  

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPersonnel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (currentPersonnel.Id === null) {
      // Adding new personnel
      try {
        const response = await axios.post(`${apiUrl}/Create User`, {
          UserName: currentPersonnel.nom,
          Email: `${currentPersonnel.nom.toLowerCase()}@example.com`, // Assuming email is based on the name
          Role: currentPersonnel.role,
          Password: 'password123', // You can replace with a dynamic password
          Specialite: currentPersonnel.specialite,
          LicenseNumber: currentPersonnel.licenseNumber,
        });
        setPersonnels([...personnels, { ...currentPersonnel, Id: personnels.length + 1 }]);
        setShowModal(false);
      } catch (error) {
        console.error("Error creating user:", error);
      }
    } else {
      // Updating existing personnel
      try {
        const response = await axios.put(`${apiUrl}/${currentPersonnel.Id}`, {
          UserName: currentPersonnel.nom,
          Email: `${currentPersonnel.nom.toLowerCase()}@example.com`,
          Role: currentPersonnel.role,
          Specialite: currentPersonnel.specialite,
          LicenseNumber: currentPersonnel.licenseNumber,
        });
        setPersonnels(personnels.map((p) => (p.Id === currentPersonnel.Id ? currentPersonnel : p)));
        setShowModal(false);
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };

  const handleEdit = (personnel) => {
    setCurrentPersonnel(personnel);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      setPersonnels(personnels.filter((personnel) => personnel.Id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
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
           
            <th>Role</th>
            <th>License Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  {personnels.map((personnel) => (
    <tr key={personnel.Id}>
      <td>{personnel.Id}</td>
      <td>{personnel.nom}</td> {/* Display the name */}
      
      <td>{personnel.role}</td>
   
      <td>{personnel.licenseNumber || 'N/A'}</td>
      <td>
        <Button
          variant="link"
          className="text-info p-0"
          onClick={() => handleEdit(personnel)}
        >
          <FaEdit size={20} color="turquoise" />
        </Button>
        <Button
          variant="link"
          className="text-danger p-0 ml-2"
          onClick={() => handleDelete(personnel.Id)}
        >
          <FaTrashAlt size={20} color="turquoise" />
        </Button>
      </td>
    </tr>
  ))}
</tbody>

      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{currentPersonnel.Id ? 'Edit' : 'Add'} Personnel</Modal.Title>
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

            <Form.Group controlId="formPrenom">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="text"
                name="prenom"
                value={currentPersonnel.prenom}
                onChange={handleChange}
                placeholder="Surname"
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
                <option>Pharmacist</option>
              </Form.Control>
            </Form.Group>

            {currentPersonnel.role === 'Doctor' ? (
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
            ) : (
              <Form.Group controlId="formLicenseNumber">
                <Form.Label>License Number</Form.Label>
                <Form.Control
                  type="text"
                  name="licenseNumber"
                  value={currentPersonnel.licenseNumber}
                  onChange={handleChange}
                  placeholder="License Number"
                />
              </Form.Group>
            )}
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

export default GestionMedecin
;
