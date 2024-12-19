import React, { useState, useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import axios from "axios";

// Tableau de correspondance des medicamentId aux noms des médicaments
const medicamentNames = {
  1: "Paracetamol",
  2: "Ibuprofen",
  // Ajoutez d'autres medicamentId et leurs noms ici
};
//fonction
function ListeOrdonnance() {
  const [ordonnances, setOrdonnances] = useState([]);
  const [error, setError] = useState("");

  const fetchOrdonnances = async () => {
    try {
      const response = await axios.get("http://localhost:5026/api/ordonnance");
      setOrdonnances(response.data);
    } catch (err) {
      setError("Une erreur s'est produite lors du chargement des ordonnances.");
    }
  };

  useEffect(() => {
    fetchOrdonnances();
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Liste des Ordonnances</h2>
      {error && <p className="text-danger">{error}</p>}
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
          {ordonnances.length > 0 ? (
            ordonnances.map((ordonnance) => (
              <tr key={ordonnance.id}>
                <td>{ordonnance.id}</td>
                <td>{ordonnance.patientName}</td>
                <td>{ordonnance.medecinName}</td>
                <td>
                  {ordonnance.medicaments &&
                  Array.isArray(ordonnance.medicaments) &&
                  ordonnance.medicaments.length > 0
                    ? ordonnance.medicaments.map((medicament, index) => (
                        <span key={index}>
                          {/* Utilisation de medicamentId pour trouver le nom du médicament */}
                          {medicamentNames[medicament.medicamentId] ||
                            "Inconnu"}
                          {index < ordonnance.medicaments.length - 1 && ", "}
                        </span>
                      ))
                    : "Aucun médicament"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                Aucune ordonnance trouvée.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default ListeOrdonnance;
