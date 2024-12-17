import React, { useState } from "react";
import { FaTrash, FaTimes } from "react-icons/fa";
import "./Alerte.css";

function AlerteMedicaments({ lowStockMedications, onUpdateQuantity, onDelete }) {
    const [showModal, setShowModal] = useState(true);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    if (!showModal || lowStockMedications.length === 0) return null;

    return (
        <div className="medication-modal">
            <button className="close-button" onClick={handleCloseModal}>
                <FaTimes />
            </button>
            <h2>Alerte Médicaments !</h2>
            <div className="medication-list">
                {lowStockMedications.map((med) => (
                    <div key={med.Id} className="medication-item">
                        <div className="medication-info">
                            <p>ID: {med.Id}</p>
                            <h6>{med.Name}</h6>
                        </div>
                        <div className="medication-actions">
                            <input
                                type="number"
                                placeholder="Ajouter quantité"
                                value={med.StockQuantity}
                                onChange={(e) => onUpdateQuantity(med.Id, e.target.value)}
                                className="quantity-input"
                            />
                            <button
                                className="delete-button"
                                onClick={() => onDelete(med.Id)}
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AlerteMedicaments;
