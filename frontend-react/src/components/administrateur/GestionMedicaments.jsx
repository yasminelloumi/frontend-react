import { useState, useEffect } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { MdDelete, MdEdit, MdShoppingCart } from "react-icons/md";
import AlerteMedicaments from "./AlerteMedicaments";

const MedicamentManagement = () => {
  const [medicaments, setMedicaments] = useState([
    { Id: 1, Name: "Paracetamol", Description: "Painkiller and antipyretic", Price: 5.50, StockQuantity: 100, ExpiryDate: "2025-12-31" },
    { Id: 2, Name: "Ibuprofen", Description: "Anti-inflammatory and analgesic", Price: 8.00, StockQuantity: 50, ExpiryDate: "2024-09-15" },
    { Id: 3, Name: "Amoxicillin", Description: "Antibiotic for infections", Price: 12.00, StockQuantity: 5, ExpiryDate: "2026-03-10" }, // Low stock for testing
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [newMedicament, setNewMedicament] = useState({
    Name: "",
    Description: "",
    Price: "",
    StockQuantity: "",
    ExpiryDate: "",
  });

  const [medicamentToEdit, setMedicamentToEdit] = useState(null);
  const [orderQuantity, setOrderQuantity] = useState(1);

  const [showAlerte, setShowAlerte] = useState(false);

  // Filtre pour les médicaments avec StockQuantity <= 10
  const lowStockMedications = medicaments.filter((med) => med.StockQuantity <= 10);
  const stockFaible = lowStockMedications.length > 0; // Show alert if there are any low stock medications

  // Effect to automatically show the alert if any stock quantity is 10 or less
  useEffect(() => {
    if (stockFaible) {
      setShowAlerte(true);  // Show alert when stock is low
    } else {
      setShowAlerte(false); // Hide alert if no low stock
    }
  }, [medicaments]); // Dependency on medicaments to re-check whenever it changes

  // Modals and input handlers
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);
  const handleEditModalClose = () => setShowEditModal(false);
  const handleEditModalShow = (medicament) => {
    setMedicamentToEdit(medicament);
    setShowEditModal(true);
  };

  const handleOrderModalClose = () => setShowOrderModal(false);
  const handleOrderModalShow = (medicament) => {
    setOrderQuantity(1);
    setShowOrderModal(true);
  };

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

  // Add and Edit actions
  const handleAddMedicament = () => {
    const newId = medicaments.length + 1;
    const newMedicamentData = { Id: newId, ...newMedicament };
    setMedicaments([...medicaments, newMedicamentData]);
    setShowModal(false);
    setNewMedicament({
      Name: "",
      Description: "",
      Price: "",
      StockQuantity: "",
      ExpiryDate: "",
    });
  };

  const handleEditMedicament = () => {
    const updatedMedicaments = medicaments.map((medicament) =>
      medicament.Id === medicamentToEdit.Id ? medicamentToEdit : medicament
    );
    setMedicaments(updatedMedicaments);
    setShowEditModal(false);
  };

  const handleDeleteMedicament = (id) => {
    setMedicaments(medicaments.filter((medicament) => medicament.Id !== id));
  };

  const handleOrderMedicament = () => {
    alert(`Ordering ${orderQuantity} of ${medicamentToEdit.Name} from supplier.`);
    setShowOrderModal(false);
    setOrderQuantity(1);
  };

  return (
    <div className="medicament-management">
      <h2>Medicament Management <i
        className="fa-solid fa-bell"
        style={{ color: stockFaible ? "red" : "black", cursor: "pointer" }}
        onClick={() => setShowAlerte(!showAlerte)} 
      ></i></h2>

      {showAlerte && (
        <AlerteMedicaments
          lowStockMedications={lowStockMedications}
          onUpdateQuantity={handleEditMedicament}
          onDelete={handleDeleteMedicament}
          onClose={() => setShowAlerte(false)} 
        />
      )}

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
                <Button variant="link" size="sm" className="me-2" onClick={() => handleEditModalShow(medicament)}>
                  <MdEdit />
                </Button>
                <Button variant="link" size="sm" onClick={() => handleDeleteMedicament(medicament.Id)}>
                  <MdDelete />
                </Button>
                <Button variant="link" size="sm" className="me-2" onClick={() => handleOrderModalShow(medicament)}>
                  <MdShoppingCart />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="success" onClick={handleModalShow}>Add Medicament</Button>

      {/* Modal for adding a new medicament */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Medicament</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formMedicamentName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Medicament Name" name="Name" value={newMedicament.Name} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMedicamentDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Medicament Description" name="Description" value={newMedicament.Description} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMedicamentPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Medicament Price" name="Price" value={newMedicament.Price} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMedicamentStockQuantity">
              <Form.Label>Stock Quantity</Form.Label>
              <Form.Control type="number" placeholder="Stock Quantity" name="StockQuantity" value={newMedicament.StockQuantity} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMedicamentExpiryDate">
              <Form.Label>Expiration Date</Form.Label>
              <Form.Control type="date" name="ExpiryDate" value={newMedicament.ExpiryDate} onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>Close</Button>
          <Button variant="primary" onClick={handleAddMedicament}>Add</Button>
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
              <Form.Control type="text" placeholder="Medicament Name" name="Name" value={medicamentToEdit?.Name} onChange={handleEditInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMedicamentDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Medicament Description" name="Description" value={medicamentToEdit?.Description} onChange={handleEditInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMedicamentPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Medicament Price" name="Price" value={medicamentToEdit?.Price} onChange={handleEditInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMedicamentStockQuantity">
              <Form.Label>Stock Quantity</Form.Label>
              <Form.Control type="number" placeholder="Stock Quantity" name="StockQuantity" value={medicamentToEdit?.StockQuantity} onChange={handleEditInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMedicamentExpiryDate">
              <Form.Label>Expiration Date</Form.Label>
              <Form.Control type="date" name="ExpiryDate" value={medicamentToEdit?.ExpiryDate} onChange={handleEditInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>Close</Button>
          <Button variant="primary" onClick={handleEditMedicament}>Save</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for ordering a medicament */}
      <Modal show={showOrderModal} onHide={handleOrderModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order Medicament</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formOrderQuantity">
            <Form.Label>Order Quantity</Form.Label>
            <Form.Control type="number" value={orderQuantity} onChange={handleOrderQuantityChange} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleOrderModalClose}>Close</Button>
          <Button variant="primary" onClick={handleOrderMedicament}>Order</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MedicamentManagement;
