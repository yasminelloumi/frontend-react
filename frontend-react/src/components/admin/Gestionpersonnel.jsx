import { useState } from 'react';
import { Table, Container, Button, Modal, Form } from 'react-bootstrap';
import "./Body.css";

function GestionPersonnel() {
  const [personnels, setPersonnels] = useState([
    {
      Id: 1,
      nom: "Dupont",
      prenom: "Jean",
      role: "Médecin",
      specialite: "Cardiologue",
      licenseNumber: null,
    },
    {
      Id: 2,
      nom: "Martin",
      prenom: "Lucie",
      role: "Pharmacien",
      specialite: null,
      licenseNumber: "1234567",
    },
  ]);
  
  const [showModal, setShowModal] = useState(false);
  const [currentPersonnel, setCurrentPersonnel] = useState({
    Id: null,
    nom: '',
    prenom: '',
    role: 'Médecin',
    specialite: '',
    licenseNumber: '',
  });

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPersonnel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (currentPersonnel.Id === null) {
      // Adding new personnel
      setPersonnels([...personnels, { ...currentPersonnel, Id: personnels.length + 1 }]);
    } else {
      // Updating existing personnel
      setPersonnels(personnels.map((p) => (p.Id === currentPersonnel.Id ? currentPersonnel : p)));
    }
    setShowModal(false);
  };

  const handleEdit = (personnel) => {
    setCurrentPersonnel(personnel);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setPersonnels(personnels.filter((personnel) => personnel.Id !== id));
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Gestion du Personnel</h2>
      <Button variant="primary" className="mb-3" onClick={handleShow}>
        Ajouter un Personnel
      </Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Rôle</th>
            <th>Spécialité</th>
            <th>Numéro de Licence</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {personnels.map((personnel) => (
            <tr key={personnel.Id}>
              <td>{personnel.Id}</td>
              <td>{personnel.nom}</td>
              <td>{personnel.prenom}</td>
              <td>{personnel.role}</td>
              <td>{personnel.specialite || 'N/A'}</td>
              <td>{personnel.licenseNumber || 'N/A'}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(personnel)}>
                  Modifier
                </Button>
                <Button variant="danger" className="ml-2" onClick={() => handleDelete(personnel.Id)}>
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{currentPersonnel.Id ? 'Modifier' : 'Ajouter'} un Personnel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNom">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="nom"
                value={currentPersonnel.nom}
                onChange={handleChange}
                placeholder="Nom"
              />
            </Form.Group>

            <Form.Group controlId="formPrenom">
              <Form.Label>Prénom</Form.Label>
              <Form.Control
                type="text"
                name="prenom"
                value={currentPersonnel.prenom}
                onChange={handleChange}
                placeholder="Prénom"
              />
            </Form.Group>

            <Form.Group controlId="formRole">
              <Form.Label>Rôle</Form.Label>
              <Form.Control
                as="select"
                name="role"
                value={currentPersonnel.role}
                onChange={handleChange}
              >
                <option>Médecin</option>
                <option>Pharmacien</option>
              </Form.Control>
            </Form.Group>

            {currentPersonnel.role === 'Médecin' ? (
              <Form.Group controlId="formSpecialite">
                <Form.Label>Spécialité</Form.Label>
                <Form.Control
                  type="text"
                  name="specialite"
                  value={currentPersonnel.specialite}
                  onChange={handleChange}
                  placeholder="Spécialité"
                />
              </Form.Group>
            ) : (
              <Form.Group controlId="formLicenseNumber">
                <Form.Label>Numéro de Licence</Form.Label>
                <Form.Control
                  type="text"
                  name="licenseNumber"
                  value={currentPersonnel.licenseNumber}
                  onChange={handleChange}
                  placeholder="Numéro de Licence"
                />
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Sauvegarder
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default GestionPersonnel;
