import { useState, useEffect } from "react";
import { Table, Container, Form, Button, Modal } from "react-bootstrap";
import { FaHistory } from "react-icons/fa"; // Pour l'icône d'historique
import axios from "axios";

function ListePatient() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null); // Stocke l'historique du patient sélectionné
  const [showModal, setShowModal] = useState(false); // Contrôle l'affichage du modal

  // Récupérer tous les patients (sans historique)
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:5026/api/Patient");
      setPatients(response.data);
    } catch (err) {
      setError("Erreur lors de la récupération des patients.");
    } finally {
      setLoading(false);
    }
  };

  // Rechercher un patient et récupérer son historique
  const searchPatients = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Si le champ de recherche est vide, afficher la liste complète des patients
    if (searchTerm.trim() === "") {
      fetchPatients(); // Rechercher tous les patients
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5026/api/Patient/search?searchTerm=${searchTerm}`
      );
      setPatients(response.data);
    } catch (err) {
      setError("Aucun patient trouvé pour ce terme de recherche.");
    } finally {
      setLoading(false);
    }
  };

  // Récupérer l'historique du patient et afficher le modal
  const getPatientHistorique = async (id) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `http://localhost:5026/api/Patient/${id}`
      );
      setSelectedPatient(response.data);
      setShowModal(true); // Ouvre le modal avec les informations du patient
    } catch (err) {
      setError("Erreur lors de la récupération de l'historique.");
    } finally {
      setLoading(false);
    }
  };

  // Fermer le modal
  const closeModal = () => setShowModal(false);

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Liste des Patients</h2>

      {/* Barre de recherche */}
      <Form onSubmit={searchPatients} className="mb-4">
        <Form.Group controlId="search">
          <Form.Control
            type="text"
            placeholder="Rechercher un patient..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-2">
          Rechercher
        </Button>
      </Form>

      {loading && <p>Chargement...</p>}
      {error && <p className="text-danger">{error}</p>}

      {/* Tableau des patients */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Historique</th> {/* Nouvelle colonne pour l'historique */}
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.namePatient}</td>
              <td>{new Date(patient.dateOfBirth).toLocaleDateString()}</td>
              <td>
                <p>{patient.historique}</p>
                <Button
                  variant="info"
                  size="sm" // Bouton plus petit
                  onClick={() => getPatientHistorique(patient.id)}
                >
                  <FaHistory /> {/* Icône d'historique */}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal pour afficher l'historique du patient */}
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Historique Médical de {selectedPatient?.namePatient}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>ID du Patient: {selectedPatient?.id}</h5>
          <h6>Nom: {selectedPatient?.namePatient}</h6>
          <p>
            <strong>Historique Médical:</strong> <br />
            {selectedPatient?.historique || "Aucun historique disponible"}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ListePatient;
