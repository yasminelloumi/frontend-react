import { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Body.css";

function AjouterOrdonnance() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Date: "",
    IDPatient: "",
    PatientName: "",
    MedecinName: "",
    Medicaments: "",
  });

  // Gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nouvelle ordonnance :", formData);
    navigate("/GestionOrdonnances"); // Retour à la liste après l'ajout
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Container className="p-4 shadow rounded" style={{ maxWidth: "600px", backgroundColor: "#f8f9fa" }}>
        <h2 className="mb-4 text-center">Nouvelle Ordonnance</h2>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={formData.Date}
                onChange={(e) => setFormData({ ...formData, Date: e.target.value })}
                required
              />
            </Col>
          </Row>

         

          <Row className="mb-3">
            <Col>
              <Form.Label>Nom du Patient</Form.Label>
              <Form.Control
                type="text"
                value={formData.PatientName}
                onChange={(e) => setFormData({ ...formData, PatientName: e.target.value })}
                required
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label>Nom du Médecin</Form.Label>
              <Form.Control
                type="text"
                value={formData.MedecinName}
                onChange={(e) => setFormData({ ...formData, MedecinName: e.target.value })}
                required
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label>Médicaments</Form.Label>
              <Form.Control
                type="text"
                value={formData.Medicaments}
                onChange={(e) => setFormData({ ...formData, Medicaments: e.target.value })}
                required
              />
            </Col>
          </Row>

          <div className="text-center">
            <Button variant="success" type="submit" className="me-3">
              Ajouter
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate("/GestionOrdonnances")}
            >
              Annuler
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default AjouterOrdonnance;
