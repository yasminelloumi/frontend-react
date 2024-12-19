import { Table, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

function MedecinListe() {
  const [medecins, setMedecins] = useState([]);

  const apiUrl = "/api/User";

  // Fetch medecins on component mount
  useEffect(() => {
    const fetchMedecins = async () => {
      try {
        const response = await axios.get(`${apiUrl}/medecins`);
        const medecinData = response.data.map((medecin) => ({
          Id: medecin.id,
          nom: medecin.userName,
          email: medecin.email,
          specialite: medecin.specialite || "N/A",
        }));
        setMedecins(medecinData);
      } catch (error) {
        console.error("Error fetching medecins:", error);
      }
    };

    fetchMedecins();
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="mb-4">List of Medecins</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Speciality</th>
          </tr>
        </thead>
        <tbody>
          {medecins.map((medecin) => (
            <tr key={medecin.Id}>
              <td>{medecin.Id}</td>
              <td>{medecin.nom}</td>
              <td>{medecin.email}</td>
              <td>{medecin.specialite}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default MedecinListe;
