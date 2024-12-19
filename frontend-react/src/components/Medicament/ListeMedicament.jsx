import React, { useState, useEffect } from "react";
import { Table, Container, Spinner, Alert } from "react-bootstrap";
import axios from "axios";

function ListeMedicament() {
  // États pour stocker les médicaments, le chargement, et les erreurs
  const [medicaments, setMedicaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour récupérer la liste des médicaments
  const fetchMedicaments = async () => {
    try {
      const response = await axios.get("http://localhost:5026/api/Medicament"); // Remplacez par l'URL réelle de votre API
      setMedicaments(response.data);
    } catch (err) {
      setError("Erreur lors de la récupération des médicaments.");
    } finally {
      setLoading(false);
    }
  };

  // Utilisation de useEffect pour charger les médicaments au montage du composant
  useEffect(() => {
    fetchMedicaments();
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Liste des Médicaments</h2>

      {/* Affichage du chargement */}
      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
          <p>Chargement...</p>
        </div>
      )}

      {/* Affichage des erreurs */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Affichage de la table si les données sont disponibles */}
      {!loading && !error && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Description</th>
              <th>Prix</th>
              <th>Quantité en Stock</th>
              <th>Quantité sortie</th>
            </tr>
          </thead>
          <tbody>
            {medicaments.map((medicament) => (
              <tr key={medicament.id}>
                <td>{medicament.id}</td>
                <td>{medicament.name}</td>
                <td>{medicament.description}</td>
                <td>{medicament.prix.toFixed(2)} €</td>
                <td>{medicament.qttStock}</td>
                <td>{medicament.QttSortie}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default ListeMedicament;
