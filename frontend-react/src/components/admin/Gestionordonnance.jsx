import { useState } from "react";
import { Table, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Body.css";

function GestionOrdonnances() {
  const [ordonnances, setOrdonnances] = useState([
    {
      IDOrdonnance: 1,
      Date: "2024-12-01",
      IDPatient: 1,
      PatientName: "John Doe",
      IDMedecin: 1,
      MedecinName: "Dr. Smith",
      Medicaments: ["Aspirin", "Metformin"],
    },
    {
      IDOrdonnance: 2,
      Date: "2024-11-20",
      IDPatient: 2,
      PatientName: "Jane Smith",
      IDMedecin: 2,
      MedecinName: "Dr. Johnson",
      Medicaments: ["Ibuprofen"],
    },
  ]);

  const navigate = useNavigate();

  // Supprimer une ordonnance
  const handleDelete = (id) => {
    const updatedOrdonnances = ordonnances.filter(
      (ordonnance) => ordonnance.IDOrdonnance !== id
    );
    setOrdonnances(updatedOrdonnances);
  };

  // Rediriger vers le formulaire d'ajout
  const handleAdd = () => navigate("/AjouterOrdonnance");

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Gestion des Ordonnances</h2>
      <Button variant="primary" className="mb-3" onClick={handleAdd}>
        Ajouter une Ordonnance
      </Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID Ordonnance</th>
            <th>Date</th>
            <th>Patient</th>
            <th>Médecin</th>
            <th>Médicaments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ordonnances.map((ordonnance) => (
            <tr key={ordonnance.IDOrdonnance}>
              <td>{ordonnance.IDOrdonnance}</td>
              <td>{new Date(ordonnance.Date).toLocaleDateString()}</td>
              <td>{ordonnance.PatientName}</td>
              <td>{ordonnance.MedecinName}</td>
              <td>{ordonnance.Medicaments.join(", ")}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(ordonnance.IDOrdonnance)}
                >
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default GestionOrdonnances;
