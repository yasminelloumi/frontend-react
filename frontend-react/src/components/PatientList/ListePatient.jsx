import { useState } from 'react';
import { Table, Container } from "react-bootstrap";

function ListePatient() {
  // Hardcoded list of patients
  const [patients] = useState([
    {
      ID: 1,
      NamePatient: "John Doe",
      DateOfBirth: "1990-05-15",
      MedicalHistory: "Hypertension, Diabetes",
    },
    {
      ID: 2,
      NamePatient: "Jane Smith",
      DateOfBirth: "1985-11-25",
      MedicalHistory: "Asthma",
    },
    {
      ID: 3,
      NamePatient: "Alice Brown",
      DateOfBirth: "2000-01-05",
      MedicalHistory: "No significant history",
    },
  ]);

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Liste des Patients</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Date de Naissance</th>
            <th>Historique Médical</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.ID}>
              <td>{patient.ID}</td>
              <td>{patient.NamePatient}</td>
              <td>{new Date(patient.DateOfBirth).toLocaleDateString()}</td>
              <td>{patient.MedicalHistory}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ListePatient;
