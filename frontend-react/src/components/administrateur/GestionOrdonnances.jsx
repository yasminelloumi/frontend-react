import { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AddPrescription() {
  const navigate = useNavigate();

  // Form state for prescription details
  const [formData, setFormData] = useState({
    Date: "",
    PatientID: "",
    PatientName: "",
    DoctorName: "",
    Medications: [{ name: "", quantity: "" }], // Start with one medication field
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New prescription:", formData);
    navigate("/ManagePrescriptions"); // Return to the list after adding
  };

  // Handle input changes for medications
  const handleMedicationChange = (index, e) => {
    const { name, value } = e.target;
    const newMedications = [...formData.Medications];
    newMedications[index] = { ...newMedications[index], [name]: value };
    setFormData({ ...formData, Medications: newMedications });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Container
        className="p-4 shadow rounded form-container"
        style={{ maxWidth: "600px" }}
      >
        <h2 className="mb-4 text-center">New Prescription</h2>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={formData.Date}
                onChange={(e) =>
                  setFormData({ ...formData, Date: e.target.value })
                }
                required
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label>Patient Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.PatientName}
                onChange={(e) =>
                  setFormData({ ...formData, PatientName: e.target.value })
                }
                required
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label>Doctor Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.DoctorName}
                onChange={(e) =>
                  setFormData({ ...formData, DoctorName: e.target.value })
                }
                required
              />
            </Col>
          </Row>

          {/* Medication fields in a single row */}
          <Row className="mb-3">
            <Col sm={6}>
              <Form.Label>Medication Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Medication name"
                value={formData.Medications[0].name}
                name="name"
                onChange={(e) => handleMedicationChange(0, e)}
                required
              />
            </Col>
            <Col sm={6}>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Quantity"
                value={formData.Medications[0].quantity}
                name="quantity"
                onChange={(e) => handleMedicationChange(0, e)}
                required
              />
            </Col>
          </Row>

          <div className="text-center">
            <Button
              variant="success"
              type="submit"
              className="me-3 btn-turquoise"
            >
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

export default AddPrescription;
