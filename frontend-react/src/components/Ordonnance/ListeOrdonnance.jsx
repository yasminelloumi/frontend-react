import React, { useState } from "react";
import { Table, Container } from "react-bootstrap";

function ListeOrdonnance() {
  // Hardcoded list of prescriptions (Ordonnances)
  const [ordonnances] = useState([
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
    {
      IDOrdonnance: 3,
      Date: "2024-10-15",
      IDPatient: 3,
      PatientName: "Alice Brown",
      IDMedecin: 3,
      MedecinName: "Dr. White",
      Medicaments: ["Paracetamol"],
    },
  ]);

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Liste des Ordonnances</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID Ordonnance</th>
            <th>Date</th>
            <th>Patient</th>
            <th>Médecin</th>
            <th>Médicaments</th>
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
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ListeOrdonnance;
