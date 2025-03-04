// src/components/DischargedPatientList.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DischargedPatientList.css';

interface DischargedPatient {
  id: number;
  name: string;
  icPassport: string;
  lastDischarged: string;
}

// Example data; replace with real API data
const mockDischargedPatients: DischargedPatient[] = [
  {
    id: 1,
    name: 'John Doe',
    icPassport: '123456789012',
    lastDischarged: '2025-03-10',
  },
  {
    id: 2,
    name: 'Jane Smith',
    icPassport: '987654321000',
    lastDischarged: '2025-03-15',
  },
];

const DischargedPatientList: React.FC = () => {
  const [patients, setPatients] = useState<DischargedPatient[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Confirmation modal state
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<DischargedPatient | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, fetch from your backend:
    // fetch('/api/discharged-patients')
    //   .then(response => response.json())
    //   .then(data => setPatients(data));
    setPatients(mockDischargedPatients);
  }, []);

  // Filter patients by name or IC/Passport
  const filteredPatients = patients.filter((p) => {
    const query = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(query) ||
      p.icPassport.toLowerCase().includes(query)
    );
  });

  // Opens a new tab to display the patient's report
  const handleViewReport = (patient: DischargedPatient) => {
    // Replace with your actual report URL
    window.open('https://www.example.com/report?patientId=' + patient.id, '_blank');
  };

  // Prompt re-admit confirmation
  const handleReAdmit = (patient: DischargedPatient) => {
    setSelectedPatient(patient);
    setShowConfirm(true);
  };

  // If user confirms re-admit, navigate to Dashboard
  const confirmReAdmit = () => {
    if (!selectedPatient) return;
    // In a real app, you'd update the server here
    // fetch(`/api/readmit/${selectedPatient.id}`, { method: 'POST' })

    setShowConfirm(false);
    navigate('/dashboard'); // Redirect to patient's dashboard
  };

  // Cancel re-admit
  const cancelReAdmit = () => {
    setShowConfirm(false);
    setSelectedPatient(null);
  };

  return (
    <div className="discharged-patient-list-container">
      <h2 className="page-title">Discharged Patient List</h2>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Name or IC/Passport"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Table */}
      <table className="patient-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>IC/Passport</th>
            <th>Last Discharged</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center' }}>
                No patients found.
              </td>
            </tr>
          ) : (
            filteredPatients.map((patient, index) => (
              <tr key={patient.id}>
                <td>{index + 1}</td>
                <td>{patient.name}</td>
                <td>{patient.icPassport}</td>
                <td>{patient.lastDischarged}</td>
                <td>
                  <button
                    className="view-report-button"
                    onClick={() => handleViewReport(patient)}
                  >
                    VIEW REPORT
                  </button>
                  <button
                    className="re-admit-button"
                    onClick={() => handleReAdmit(patient)}
                  >
                    RE-ADMIT
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Re-Admit Confirmation Modal */}
      {showConfirm && selectedPatient && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Are you sure?</h3>
            <div className="modal-buttons">
              <button onClick={confirmReAdmit} className="yes-button">
                Yes
              </button>
              <button onClick={cancelReAdmit} className="no-button">
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DischargedPatientList;
