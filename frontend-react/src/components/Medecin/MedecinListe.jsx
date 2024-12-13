import { useState } from 'react';
import { Table, Container } from "react-bootstrap";

function MedecinListe() {
  // Hardcoded list of doctors
  const [medecins] = useState([
    {
      Id: 1,
      Specialite: "Cardiologue",
      ApplicationUserId: "user123",
    },
    {
      Id: 2,
      Specialite: "Pédiatre",
      ApplicationUserId: "user124",
    },
    {
      Id: 3,
      Specialite: "Dermatologue",
      ApplicationUserId: "user125",
    },
  ]);

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Liste des Médecins</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Spécialité</th>
            <th>ID Utilisateur</th>
          </tr>
        </thead>
        <tbody>
          {medecins.map((medecin) => (
            <tr key={medecin.Id}>
              <td>{medecin.Id}</td>
              <td>{medecin.Specialite}</td>
              <td>{medecin.ApplicationUserId}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default MedecinListe;
