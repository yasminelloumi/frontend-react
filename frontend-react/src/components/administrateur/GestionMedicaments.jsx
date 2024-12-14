import { useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { MdDelete, MdEdit, MdShoppingCart } from "react-icons/md"; // Import the icons

const MedicamentManagement = () => {
  // Simulate medicament data
  const [medicaments, setMedicaments] = useState([
    {
      Id: 1,
      Name: "Paracetamol",
      Description: "Painkiller and antipyretic",
      Price: 5.50,
      StockQuantity: 100,
      ExpiryDate: "2025-12-31",
    },
    {
      Id: 2,
      Name: "Ibuprofen",
      Description: "Anti-inflammatory and analgesic",
      Price: 8.00,
      StockQuantity: 50,
      ExpiryDate: "2024-09-15",
    },
    {
      Id: 3,
      Name: "Amoxicillin",
      Description: "Antibiotic for infections",
      Price: 12.00,
      StockQuantity: 200,
      ExpiryDate: "2026-03-10",
    },
  ]);

  // Modal state and form data for adding a new medicament
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // Modal for editing
  const [showOrderModal, setShowOrderModal] = useState(false); // Modal for ordering
  const [newMedicament, setNewMedicament] = useState({
    Name: "",
    Description: "",
    Price: "",
    StockQuantity: "",
    ExpiryDate: "",
  });

  const [medicamentToEdit, setMedicamentToEdit] = useState(null); // State for the medicament to edit
  const [orderQuantity, setOrderQuantity] = useState(1); // Quantity for the order

  // Handle opening and closing modal
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);
  const handleEditModalClose = () => setShowEditModal(false); // Close edit modal
  const handleEditModalShow = (medicament) => {
    setMedicamentToEdit(medicament);
    setShowEditModal(true);
  };

  const handleOrderModalClose = () => setShowOrderModal(false); // Close order modal
  const handleOrderModalShow = (medicament) => {
    setOrderQuantity(1); // Reset quantity when opening the order modal
    setShowOrderModal(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMedicament({ ...newMedicament, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setMedicamentToEdit({ ...medicamentToEdit, [name]: value });
  };

  const handleOrderQuantityChange = (e) => {
    setOrderQuantity(e.target.value);
  };

  // Handle adding a new medicament
  const handleAddMedicament = () => {
    const newId = medicaments.length + 1; // Generate a new ID for the new medicament
    const newMedicamentData = { Id: newId, ...newMedicament };
    setMedicaments([...medicaments, newMedicamentData]);
    setShowModal(false); // Close modal after adding
    setNewMedicament({
      Name: "",
      Description: "",
      Price: "",
      StockQuantity: "",
      ExpiryDate: "",
    }); // Reset form
  };

  // Handle editing a medicament
  const handleEditMedicament = () => {
    const updatedMedicaments = medicaments.map((medicament) =>
      medicament.Id === medicamentToEdit.Id ? medicamentToEdit : medicament
    );
    setMedicaments(updatedMedicaments);
    setShowEditModal(false); // Close the edit modal
  };

  // Handle deleting a medicament
  const handleDeleteMedicament = (id) => {
    setMedicaments(medicaments.filter((medicament) => medicament.Id !== id));
  };

  // Handle ordering a medicament
  const handleOrderMedicament = () => {
    alert(`Ordering ${orderQuantity} of ${medicamentToEdit.Name} from supplier.`);
    setShowOrderModal(false); // Close the order modal
    setOrderQuantity(1); // Reset quantity after order
  };

  return (
    <div className="medicament-management">
      <h2>Medicament Management</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock Quantity</th>
            <th>Expiration Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicaments.map((medicament) => (
            <tr key={medicament.Id}>
              <td>{medicament.Id}</td>
              <td>{medicament.Name}</td>
              <td>{medicament.Description}</td>
              <td>{medicament.Price} €</td>
              <td>{medicament.StockQuantity}</td>
              <td>{new Date(medicament.ExpiryDate).toLocaleDateString()}</td>
              <td>
                <Button
                  variant="link"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEditModalShow(medicament)}
                >
                  <MdEdit /> {/* Edit Icon */}
                </Button>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => handleDeleteMedicament(medicament.Id)}
                >
                  <MdDelete /> {/* Delete Icon */}
                </Button>
                <Button
                  variant="link"
                  size="sm"
                  className="me-2"
                  onClick={() => handleOrderModalShow(medicament)}
                >
                  <MdShoppingCart /> {/* Order Icon */}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Button to add a new medicament */}
      <Button variant="success" onClick={handleModalShow}>
        Add Medicament
      </Button>

      {/* Modal for adding a new medicament */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Medicament</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formMedicamentName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Medicament Name"
                name="Name"
                value={newMedicament.Name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMedicamentDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Medicament Description"
                name="Description"
                value={newMedicament.Description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMedicamentPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Medicament Price"
                name="Price"
                value={newMedicament.Price}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMedicamentStockQuantity">
              <Form.Label>Stock Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Stock Quantity"
                name="StockQuantity"
                value={newMedicament.StockQuantity}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMedicamentExpiryDate">
              <Form.Label>Expiration Date</Form.Label>
              <Form.Control
                type="date"
                name="ExpiryDate"
                value={newMedicament.ExpiryDate}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddMedicament}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for editing a medicament */}
      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Medicament</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formMedicamentName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Medicament Name"
                name="Name"
                value={medicamentToEdit?.Name || ""}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMedicamentDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Medicament Description"
                name="Description"
                value={medicamentToEdit?.Description || ""}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMedicamentPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Medicament Price"
                name="Price"
                value={medicamentToEdit?.Price || ""}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMedicamentStockQuantity">
              <Form.Label>Stock Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Stock Quantity"
                name="StockQuantity"
                value={medicamentToEdit?.StockQuantity || ""}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMedicamentExpiryDate">
              <Form.Label>Expiration Date</Form.Label>
              <Form.Control
                type="date"
                name="ExpiryDate"
                value={medicamentToEdit?.ExpiryDate || ""}
                onChange={handleEditInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditMedicament}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for ordering a medicament */}
      <Modal show={showOrderModal} onHide={handleOrderModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order Medicament</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formOrderQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={orderQuantity}
                onChange={handleOrderQuantityChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleOrderModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleOrderMedicament}>
            Order
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MedicamentManagement;
