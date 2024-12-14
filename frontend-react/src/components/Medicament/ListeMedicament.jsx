import { useState } from "react";
import { Table, Container } from "react-bootstrap";

function ListeMedicament() {
  // Liste simulée de médicaments
  const [medicaments] = useState([
    {
      Id: 1,
      Name: "Paracétamol",
      Description: "Antidouleur et antipyrétique",
      Prix: 5.50,
      QttStock: 100,
      DateExpiration: "2025-12-31",
    },
    {
      Id: 2,
      Name: "Ibuprofène",
      Description: "Anti-inflammatoire et analgésique",
      Prix: 8.00,
      QttStock: 50,
      DateExpiration: "2024-09-15",
    },
    {
      Id: 3,
      Name: "Amoxicilline",
      Description: "Antibiotique pour les infections",
      Prix: 12.00,
      QttStock: 200,
      DateExpiration: "2026-03-10",
    },
  ]);

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Liste des Médicaments</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Description</th>
            <th>Prix</th>
            <th>Quantité en Stock</th>
            <th>Date d&apos;Expiration</th>
          </tr>
        </thead>
        <tbody>
          {medicaments.map((medicament) => (
            <tr key={medicament.Id}>
              <td>{medicament.Id}</td>
              <td>{medicament.Name}</td>
              <td>{medicament.Description}</td>
              <td>{medicament.Prix} €</td>
              <td>{medicament.QttStock}</td>
              <td>{new Date(medicament.DateExpiration).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ListeMedicament;
