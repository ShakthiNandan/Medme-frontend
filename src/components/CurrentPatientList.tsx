// src/components/CurrentPatientList.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CurrentPatientList.css';

interface Patient {
  id: number;
  name: string;
  icPassport: string;
  admittedDate: string;
  address?: string;
  dateOfBirth?: string;
  gender?: string;
  mobile?: string;
  height?: string;
  weight?: string;
  temperature?: string;
}

const mockPatients: Patient[] = [
  {
    id: 1,
    name: 'John Doe',
    icPassport: '123456789012',
    admittedDate: '2025-03-01',
    address: '123 Street',
    dateOfBirth: '1990-01-01',
    gender: 'Male',
    mobile: '1234567890',
    height: '170',
    weight: '70',
    temperature: '37'
  },
  {
    id: 2,
    name: 'Jane Smith',
    icPassport: '987654321000',
    admittedDate: '2025-03-02',
    address: '456 Avenue',
    dateOfBirth: '1992-05-10',
    gender: 'Female',
    mobile: '0987654321',
    height: '160',
    weight: '60',
    temperature: '36.8'
  }
];

const CurrentPatientList: React.FC = () => {
  const navigate = useNavigate();

  // State for all patients and search
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // State for modals
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dischargeModalOpen, setDischargeModalOpen] = useState(false);

  // State for the patient being edited or discharged
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // Discharge remarks
  const [dischargeRemarks, setDischargeRemarks] = useState('');

  // Fetch patients from backend (here using mock data for demo)
  useEffect(() => {
    // In a real app, you'd fetch from an API:
    // fetch('/api/current-patients').then(...);
    setPatients(mockPatients);
  }, []);

  // Filtered list based on search query
  const filteredPatients = patients.filter((p) => {
    const query = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(query) ||
      p.icPassport.toLowerCase().includes(query)
    );
  });

  // Handle "View" -> go to patient dashboard
  const handleView = (patientId: number) => {
    // Navigate to a route like /dashboard?patientId=xxx
    navigate(`/app/dashboard?patientId=${patientId}`);
  };

  // Handle "Edit" -> open modal with selected patient
  const handleEdit = (patient: Patient) => {
    setSelectedPatient(patient);
    setEditModalOpen(true);
  };

  // Close edit modal
  const closeEditModal = () => {
    setSelectedPatient(null);
    setEditModalOpen(false);
  };

  // Save edited patient
  const saveEdit = () => {
    if (!selectedPatient) return;

    // In a real app, you'd send updated data to backend:
    // fetch(`/api/patient/${selectedPatient.id}`, { method: 'PUT', body: JSON.stringify(selectedPatient) })
    //   .then(...);

    // Update local state
    setPatients((prev) =>
      prev.map((p) => (p.id === selectedPatient.id ? selectedPatient : p))
    );

    closeEditModal();
  };

  // Handle "Discharge" -> open discharge modal
  const handleDischarge = (patient: Patient) => {
    setSelectedPatient(patient);
    setDischargeRemarks('');
    setDischargeModalOpen(true);
  };

  // Close discharge modal
  const closeDischargeModal = () => {
    setSelectedPatient(null);
    setDischargeModalOpen(false);
  };

  // Save discharge (confirmation)
  const confirmDischarge = () => {
    if (!selectedPatient) return;

    // In a real app, you'd POST to an endpoint with remarks, etc.
    // fetch(`/api/discharge/${selectedPatient.id}`, { method: 'POST', body: JSON.stringify({ remarks: dischargeRemarks }) })
    //   .then(...);

    // Remove from local state
    setPatients((prev) => prev.filter((p) => p.id !== selectedPatient.id));

    closeDischargeModal();
  };

  // Handlers for editing form fields
  const handleEditFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!selectedPatient) return;
    const { name, value } = e.target;
    setSelectedPatient({ ...selectedPatient, [name]: value });
  };

  return (
    <div className="current-patient-list-container">
      <h2 className="page-title">Current Patient List</h2>

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
            <th>Admitted Date</th>
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
                <td>{patient.admittedDate}</td>
                <td>
                  <button className="view-button" onClick={() => handleView(patient.id)}>
                    VIEW
                  </button>
                  <button className="edit-button" onClick={() => handleEdit(patient)}>
                    EDIT
                  </button>
                  <button className="discharge-button" onClick={() => handleDischarge(patient)}>
                    DISCHARGE
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editModalOpen && selectedPatient && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Patient</h3>
            <div className="edit-form">
              <label>
                Name*
                <input
                  type="text"
                  name="name"
                  value={selectedPatient.name}
                  onChange={handleEditFieldChange}
                />
              </label>
              <label>
                Address*
                <input
                  type="text"
                  name="address"
                  value={selectedPatient.address || ''}
                  onChange={handleEditFieldChange}
                />
              </label>
              <label>
                Date of Birth
                <input
                  type="date"
                  name="dateOfBirth"
                  value={selectedPatient.dateOfBirth || ''}
                  onChange={handleEditFieldChange}
                />
              </label>
              <label>
                IC / Passport*
                <input
                  type="text"
                  name="icPassport"
                  value={selectedPatient.icPassport}
                  onChange={handleEditFieldChange}
                />
              </label>
              <label>
                Gender*
                <select
                  name="gender"
                  value={selectedPatient.gender || ''}
                  onChange={handleEditFieldChange}
                >
                  <option value="">--Select--</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </label>
              <label>
                Mobile
                <input
                  type="text"
                  name="mobile"
                  value={selectedPatient.mobile || ''}
                  onChange={handleEditFieldChange}
                />
              </label>
              <label>
                Height
                <input
                  type="text"
                  name="height"
                  value={selectedPatient.height || ''}
                  onChange={handleEditFieldChange}
                />
              </label>
              <label>
                Weight
                <input
                  type="text"
                  name="weight"
                  value={selectedPatient.weight || ''}
                  onChange={handleEditFieldChange}
                />
              </label>
              <label>
                Temperature
                <input
                  type="text"
                  name="temperature"
                  value={selectedPatient.temperature || ''}
                  onChange={handleEditFieldChange}
                />
              </label>
            </div>
            <div className="modal-buttons">
              <button onClick={saveEdit} className="save-button">Save</button>
              <button onClick={closeEditModal} className="cancel-button">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Discharge Modal */}
      {dischargeModalOpen && selectedPatient && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Discharge Patient</h3>
            <label>Remarks</label>
            <input
              type="text"
              value={dischargeRemarks}
              onChange={(e) => setDischargeRemarks(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={confirmDischarge} className="save-button">Save</button>
              <button onClick={closeDischargeModal} className="cancel-button">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentPatientList;
