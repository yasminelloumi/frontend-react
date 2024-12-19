import { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function EnvoyerOrdonnance() {
  const navigate = useNavigate();

  // Form state for prescription details
  const [formData, setFormData] = useState({
    patientId: 0,
    medecinName: "",
    medicaments: [
      {
        medicamentId: 0,
        quantite: 0,
      },
    ],
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("New prescription:", formData);

    // Prepare the data to send to the backend
    const prescriptionData = {
      patientId: formData.patientId,
      medecinName: formData.medecinName,
      medicaments: formData.medicaments.map(med => ({
        medicamentId: med.medicamentId,
        quantite: med.quantite
      }))
    };

    try {
      // Send data to the backend API via POST
      const response = await axios.post('/api/Ordonnance', prescriptionData);
      console.log('Prescription created successfully:', response.data);

      // Redirect after successful submission
      navigate("/");
    } catch (error) {
      console.error("Error while creating prescription:", error.response?.data || error.message);
    }
  };

  // Handle changes in medication details
  const handleMedicationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMedications = [...formData.medicaments];
    updatedMedications[index] = { ...updatedMedications[index], [name]: value };
    setFormData({ ...formData, medicaments: updatedMedications });
  };

  // Add a new medication to the list
  const addMedication = () => {
    setFormData({
      ...formData,
      medicaments: [...formData.medicaments, { medicamentId: 0, quantite: 0 }],
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Container className="p-4 shadow rounded form-container" style={{ maxWidth: "600px" }}>
        <h2 className="mb-4 text-center">New Prescription</h2>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Label>Patient ID</Form.Label>
              <Form.Control
                type="number"
                value={formData.patientId}
                onChange={(e) => setFormData({ ...formData, patientId: parseInt(e.target.value, 10) })}
                required
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label>Doctor&apos;s Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.medecinName}
                onChange={(e) => setFormData({ ...formData, medecinName: e.target.value })}
                required
              />
            </Col>
          </Row>

          <h5 className="mb-3">Medications</h5>
          {formData.medicaments.map((medicament, index) => (
            <Row className="mb-3" key={index}>
              <Col sm={6}>
                <Form.Label>Medication ID</Form.Label>
                <Form.Control
                  type="number"
                  name="medicamentId"
                  placeholder="Medication ID"
                  value={medicament.medicamentId}
                  onChange={(e) => handleMedicationChange(index, e)}
                  required
                />
              </Col>
              <Col sm={6}>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="quantite"
                  placeholder="Quantity"
                  value={medicament.quantite}
                  onChange={(e) => handleMedicationChange(index, e)}
                  required
                />
              </Col>
            </Row>
          ))}

          <div className="text-center mb-3">
            <Button variant="primary" onClick={addMedication} className="btn-turquoise">
              Add Medication
            </Button>
          </div>

          <div className="text-center">
            <Button variant="success" type="submit" className="me-3 btn-turquoise">
              Add
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate("/ManagePrescriptions")}
              className="btn-turquoise"
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default EnvoyerOrdonnance;
