import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Body = () => {


    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <div className="text-center">
                <h1 className="mb-4">Bienvenue sur notre plateforme E-Santé</h1>
                <p className="mb-4">Choisissez une section pour continuer :</p>
                <div className="d-flex flex-wrap justify-content-center gap-3">
                    <button
                        className="btn btn-primary"
                        onClick={() => handleNavigation('/patient')}
                    >
                        Patient
                    </button>
                    <button
                        className="btn btn-success"

                    >
                        Médecin
                    </button>
                    <button
                        className="btn btn-info"

                    >
                        Médicament
                    </button>
                    <button
                        className="btn btn-warning"

                    >
                        Ordonnance
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Body;
