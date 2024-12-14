import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminProfile.css'; // Assurez-vous d'importer le fichier CSS personnalisé
import "./Body.css";

const AdminProfile = () => {
  const [adminInfo, setAdminInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+33 1 23 45 67 89',
    address: '123 Rue Exemple, Paris'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleDelete = (field) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${field} ?`)) {
      setAdminInfo((prevInfo) => ({
        ...prevInfo,
        [field]: '',
      }));
      alert(`${field} a été supprimé.`);
    }
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Mon Profil</h2>
      <div className="profile-container">
        {/* Information du Profil */}
        <div className="profile-info">
          <div className="mb-3 d-flex align-items-center">
            <i
              className="fas fa-edit me-2"
              onClick={() => handleDelete('firstName')}
              style={{ cursor: 'pointer' }}
            ></i>
            <label htmlFor="firstName" className="form-label">Prénom:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="form-control ms-2"
              value={adminInfo.firstName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="mb-3 d-flex align-items-center">
            <i
              className="fas fa-edit me-2"
              onClick={() => handleDelete('lastName')}
              style={{ cursor: 'pointer' }}
            ></i>
            <label htmlFor="lastName" className="form-label">Nom:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="form-control ms-2"
              value={adminInfo.lastName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="mb-3 d-flex align-items-center">
            <i
              className="fas fa-edit me-2"
              onClick={() => handleDelete('email')}
              style={{ cursor: 'pointer' }}
            ></i>
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control ms-2"
              value={adminInfo.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="mb-3 d-flex align-items-center">
            <i
              className="fas fa-edit me-2"
              onClick={() => handleDelete('phone')}
              style={{ cursor: 'pointer' }}
            ></i>
            <label htmlFor="phone" className="form-label">Téléphone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="form-control ms-2"
              value={adminInfo.phone}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="mb-3 d-flex align-items-center">
            <i
              className="fas fa-edit me-2"
              onClick={() => handleDelete('address')}
              style={{ cursor: 'pointer' }}
            ></i>
            <label htmlFor="address" className="form-label">Adresse:</label>
            <input
              type="text"
              id="address"
              name="address"
              className="form-control ms-2"
              value={adminInfo.address}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="profile-actions">
          <div className="d-flex flex-column align-items-end">
            {isEditing ? (
              <>
                <button type="button" className="btn btn-dark mb-2" onClick={toggleEdit}>
                  Sauvegarder
                </button>
                <button type="button" className="btn btn-secondary" onClick={toggleEdit}>
                  Annuler
                </button>
              </>
            ) : (
              <>
               
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
