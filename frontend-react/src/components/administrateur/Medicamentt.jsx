import React, { useState } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";
import axios from "axios";

function MedicamentManagement() {
  // State initialization
  const [lowStockMedicaments, setLowStockMedicaments] = useState([]); // This stores the low stock medicaments
  const [showAlertModal, setShowAlertModal] = useState(false); // Modal visibility state for low stock alert
  const [alertMessage, setAlertMessage] = useState(""); // State to store the alert message
  const [showRequestModal, setShowRequestModal] = useState(false); // Visibility for the request modal
  const [requestData, setRequestData] = useState([]); // Store the data for the request modal

  // Fetch low stock medicaments from the backend API
  function fetchLowStockMedicaments() {
    axios
      .get("/api/medicament/seuil")
      .then((response) => {
        console.log("API Response:", response.data);

        // If the response is a string (message), store it in the alertMessage state
        if (typeof response.data === "string") {
          setAlertMessage(response.data);
          setLowStockMedicaments([]); // Clear the medicaments list
        }
        // If the response is an array (list of low stock medicaments), store it in the lowStockMedicaments state
        else if (Array.isArray(response.data)) {
          setAlertMessage(""); // Clear the alert message
          setLowStockMedicaments(response.data); // Store the medicaments in state
        }
        // Show the alert modal if there's any response (either a message or low stock medicaments)
        setShowAlertModal(true);
      })
      .catch((error) => {
        console.error("Error fetching medicaments:", error);
        setLowStockMedicaments([]); // Reset the data in case of an error
        setAlertMessage("An error occurred while fetching data.");
      });
  }

  // Handle the bell click event
  function handleBellClick() {
    fetchLowStockMedicaments(); // Fetch medicaments when bell is clicked
  }

  // Handle modal close event for the low stock alert modal
  function handleModalClose() {
    setShowAlertModal(false); // Close the alert modal
  }

  // Handle "Request" button click to fetch medicament request data
  function handleRequestClick() {
    axios
      .get("/api/Medicament/en-seuil-pour-demande")
      .then((response) => {
        console.log("Request Response:", response.data);
        setRequestData(response.data); // Set the response data in state
        setShowRequestModal(true); // Show the second modal with the form
      })
      .catch((error) => {
        console.error("Error sending request:", error);
        setRequestData([]); // Reset data in case of an error
      });
  }

  // Handle request modal close
  function handleRequestModalClose() {
    setShowRequestModal(false); // Close the request modal
  }

  // Handle quantity change in request modal form
  function handleQuantityChange(e, medicamentId) {
    const updatedRequestData = requestData.map((medicament) => {
      if (medicament.medicamentId === medicamentId) {
        return { ...medicament, quantiteDemandee: e.target.value };
      }
      return medicament;
    });
    setRequestData(updatedRequestData); // Update the requestData state
  }

  // Handle form submission for the request modal (if you plan to submit the data)
  function handleSubmitRequest() {
    // Prepare the request payload with medicamentId, medicamentName, and quantiteDemandee
    const requestPayload = requestData.map((medicament) => ({
      medicamentId: medicament.medicamentId,  // Ensure this matches your data
      medicamentName: medicament.medicamentName,  // Ensure medicamentName is included
      quantiteDemandee: medicament.quantiteDemandee || 0,  // Default to 0 if not specified
    }));

    console.log("Submitting request with data:", requestPayload);  // Log the payload for debugging

    // Send the POST request to submit the request data
    axios
      .post("/api/Medicament/envoyer-demande", requestPayload)
      .then((response) => {
        console.log("Request submitted successfully:", response.data);
        alert("Request submitted successfully: " + response.data);  // Show success message

        // After successful request, send to the fournisseur for processing
        const fournisseurPayload = requestData.map((medicament) => ({
          id: 0, // Default value for ID, could be updated later
          medicamentId: medicament.medicamentId,
          quantite: 2147483647, // Placeholder quantity
          statut: "Pending", // Placeholder status
          dateDemande: new Date().toISOString(), // Current date and time
        }));

        // Send the request to the fournisseur
        axios
          .post("/api/Fournisseur/traiter", fournisseurPayload)
          .then((fournisseurResponse) => {
            console.log("Fournisseur response:", fournisseurResponse.data);
            // Show the response from fournisseur
            alert(fournisseurResponse.data.join("\n"));
          })
          .catch((fournisseurError) => {
            console.error("Error processing fournisseur request:", fournisseurError);
            alert("Failed to send to fournisseur.");
          });

        setShowRequestModal(false);  // Close the modal on success
      })
      .catch((error) => {
        // Handle error response
        if (error.response) {
          console.error("Error response:", error.response);
          alert(`Request failed: ${error.response.data.message || error.message}`);
        } else {
          console.error("Error message:", error.message);
        }
      });
  }

  return (
    <div>
      <h2>
        Medicament Management
        {/* Bell Icon, changes color based on the alert state */}
        <i
          className="fa-solid fa-bell"
          style={{ color: lowStockMedicaments.length > 0 ? "red" : "black", cursor: "pointer" }}
          onClick={handleBellClick} // Trigger the fetch function on click
        ></i>
      </h2>

      {/* First Modal: Low Stock Alert */}
      {showAlertModal && (
        <Modal show={showAlertModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Low Stock Alert</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Check if there's an alert message to display */}
            {alertMessage ? (
              <div>{alertMessage}</div> // Display the alert message
            ) : (
              <div>
                <h5>The following medicaments have low stock:</h5>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>Stock Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Display the low stock medicaments */}
                    {lowStockMedicaments.length > 0 ? (
                      lowStockMedicaments.map((med) => (
                        <tr key={med.medicamentId}>
                          <td>{med.medicamentName}</td>
                          <td>{med.description}</td>
                          <td>{med.price}</td>
                          <td>{med.stockQuantity}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">No low stock items found.</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            )}
            {/* Request Button to fetch data from the second endpoint */}
            <Button variant="primary" onClick={handleRequestClick}>
              Request
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Second Modal: Request Form */}
      {showRequestModal && (
        <Modal show={showRequestModal} onHide={handleRequestModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Request Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Check if request data exists */}
            {requestData.length > 0 ? (
              <div>
                <h5>Request Information:</h5>
                <Form>
                  {requestData.map((medicament) => (
                    <div key={medicament.medicamentId} className="mb-3">
                      <Form.Group controlId={`medicament-${medicament.medicamentId}`}>
                        <Form.Label>Id</Form.Label>
                        <Form.Control
                          type="number"
                          value={medicament.medicamentId}
                          disabled
                        />
                      </Form.Group>
                      <Form.Group controlId={`medicament-${medicament.medicamentId}-name`}>
                        <Form.Label>Nom</Form.Label>
                        <Form.Control
                          type="text"
                          value={medicament.medicamentName}
                          disabled
                        />
                      </Form.Group>
                      <Form.Group controlId={`medicament-${medicament.medicamentId}-quantity`}>
                        <Form.Label>Quantity to Request</Form.Label>
                        <Form.Control
                          type="number"
                          value={medicament.quantiteDemandee || 0}
                          onChange={(e) => handleQuantityChange(e, medicament.medicamentId)}
                          min="0"
                          placeholder="Enter quantity to request"
                        />
                      </Form.Group>
                    </div>
                  ))}
                </Form>
              </div>
            ) : (
              <div>No request data available.</div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleRequestModalClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmitRequest}>
              Submit Request
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default MedicamentManagement;
