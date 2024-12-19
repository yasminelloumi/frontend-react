import React, { useState, useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import axios from "axios";

function ListeOrdonnance() {
  const [ordonnances, setOrdonnances] = useState([]);

  // Fetch ordonnance data from the API
  useEffect(() => {
    const fetchOrdonnances = async () => {
      try {
        const response = await axios.get("/api/Ordonnance");
        const ordonnanceData = response.data.map((ordonnance) => ({
          IDOrdonnance: ordonnance.id, // Assuming 'id' is the identifier for the ordonnance

          PatientName: `Patient ${ordonnance.patientId}`, // Patient name can be adjusted based on your data
          MedecinName: ordonnance.medecinName,
          Medicaments: ordonnance.medicaments.map(
            (medicament) => medicament.medicamentId
          ), // Displaying medicamentId, adjust as needed
        }));
        setOrdonnances(ordonnanceData);
      } catch (error) {
        console.error("Error fetching ordonnances:", error);
      }
    };

    fetchOrdonnances();
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Liste des Ordonnances</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID Ordonnance</th>

            <th>Patient</th>
            <th>Médecin</th>
            <th>Médicaments</th>
          </tr>
        </thead>
        <tbody>
          {ordonnances.map((ordonnance) => (
            <tr key={ordonnance.IDOrdonnance}>
              <td>{ordonnance.IDOrdonnance}</td>

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
