import { useState } from 'react';
import { Table, Container, Button, Form, Modal } from 'react-bootstrap';
import "./Body.css";

function GestionMedicaments() {
  // Liste des médicaments
  const [medicaments, setMedicaments] = useState([
    {
      Id: 1,
      Name: "Paracétamol",
      Description: "Antidouleur et antipyrétique",
      Prix: 5.5,
      QttStock: 100,
      DateExpiration: "2025-12-31",
    },
    {
      Id: 2,
      Name: "Ibuprofène",
      Description: "Anti-inflammatoire et analgésique",
      Prix: 8.0,
      QttStock: 50,
      DateExpiration: "2024-09-15",
    },
    {
      Id: 3,
      Name: "Amoxicilline",
      Description: "Antibiotique pour les infections",
      Prix: 12.0,
      QttStock: 200,
      DateExpiration: "2026-03-10",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentMedicament, setCurrentMedicament] = useState(null);
  const [formData, setFormData] = useState({
    Id: '',
    Name: '',
    Description: '',
    Prix: '',
    QttStock: '',
    DateExpiration: '',
  });

  // Afficher le modal
  const handleShow = (medicament = null) => {
    setCurrentMedicament(medicament);
    setFormData(medicament || {
      Id: '',
      Name: '',
      Description: '',
      Prix: '',
      QttStock: '',
      DateExpiration: '',
    });
    setShowModal(true);
  };

  // Cacher le modal
  const handleClose = () => setShowModal(false);

  // Supprimer un médicament
  const handleDelete = (id) => {
    setMedicaments(medicaments.filter((med) => med.Id !== id));
  };

  // Sauvegarder ou modifier un médicament
  const handleSave = () => {
    if (currentMedicament) {
      // Modification
      setMedicaments(
        medicaments.map((med) => (med.Id === currentMedicament.Id ? formData : med))
      );
    } else {
      // Ajout
      setMedicaments([...medicaments, { ...formData, Id: medicaments.length + 1 }]);
    }
    handleClose();
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Gestion des Médicaments</h2>
      <Button variant="primary" className="mb-3" onClick={() => handleShow()}>
        Ajouter un Médicament
      </Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Description</th>
            <th>Prix</th>
            <th>Quantité en Stock</th>
            <th>Date d&apos;Expiration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicaments.map((medicament) => (
            <tr key={medicament.Id}>
              <td>{medicament.Id}</td>
              <td>{medicament.Name}</td>
              <td>{medicament.Description}</td>
              <td>{medicament.Prix.toFixed(2)} €</td>
              <td>{medicament.QttStock}</td>
              <td>{new Date(medicament.DateExpiration).toLocaleDateString()}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleShow(medicament)}
                >
                  Modifier
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(medicament.Id)}
                >
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal pour Ajouter/Modifier */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentMedicament ? 'Modifier le Médicament' : 'Ajouter un Médicament'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                value={formData.Name}
                onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={formData.Description}
                onChange={(e) => setFormData({ ...formData, Description: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Prix</Form.Label>
              <Form.Control
                type="number"
                value={formData.Prix}
                onChange={(e) => setFormData({ ...formData, Prix: parseFloat(e.target.value) })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantité en Stock</Form.Label>
              <Form.Control
                type="number"
                value={formData.QttStock}
                onChange={(e) => setFormData({ ...formData, QttStock: parseInt(e.target.value) })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date d&apos;Expiration</Form.Label>
              <Form.Control
                type="date"
                value={formData.DateExpiration}
                onChange={(e) => setFormData({ ...formData, DateExpiration: e.target.value })}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Sauvegarder
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default GestionMedicaments;
