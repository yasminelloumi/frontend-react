import { Table, Container } from "react-bootstrap";
function MedecinListe() {
  return (
    <Container className="mt-5">
      <h2 className="mb-4">Liste des Médecins</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Spécialité</th>
          </tr>
        </thead>
      </Table>
    </Container>
  );
}

export default MedecinListe;
