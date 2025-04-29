import React from 'react';
import { Link } from 'react-router-dom';
import './PatientTypeSelection.css';

const PatientTypeSelection: React.FC = () => {
  return (
    <div className="patient-type-container">
      <h2 className="patient-type-title">Select Patient Type</h2>

      <div className="patient-type-buttons">
        <Link to="/app/patient-registration" className="patient-button new-patient">
          New Patient
        </Link>

        <Link to="/app/current-patient-list" className="patient-button current-patient">
          Current Patient
        </Link>

        <Link to="/app/discharged-patient-list" className="patient-button discharged-patient">
          Discharged Patient
        </Link>
      </div>

      <Link to="/app/dashboard" className="skip-button">
        Skip
      </Link>
    </div>
  );
};

export default PatientTypeSelection;
