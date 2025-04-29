import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ThreeDViewer from './ThreeDViewer';
import './Dashboard.css';

interface Patient {
  id: number;
  name: string;
  icPassport: string;
  admittedDate: string;
  vitalSigns: {
    bloodPressure: string;
    heartRate: string;
    respiratoryRate: string;
    oxygenSaturation: string;
    temperature: string;
  };
}

const Dashboard: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [timelineEvents, setTimelineEvents] = useState<any[]>([]);

  useEffect(() => {
    const patientId = searchParams.get('patientId');
    if (patientId) {
      // In a real app, fetch patient data from API
      // fetch(`/api/patients/${patientId}`).then(...)
      setPatient({
        id: 1,
        name: 'John Doe',
        icPassport: '123456789012',
        admittedDate: '2024-03-01',
        vitalSigns: {
          bloodPressure: '120/80',
          heartRate: '72',
          respiratoryRate: '16',
          oxygenSaturation: '98%',
          temperature: '37.0°C'
        }
      });

      // Mock timeline events
      setTimelineEvents([
        { id: 1, time: '10:00', event: 'Patient admitted', type: 'admission' },
        { id: 2, time: '10:15', event: 'Vital signs recorded', type: 'vitals' },
        { id: 3, time: '10:30', event: 'Blood pressure check', type: 'vitals' },
        { id: 4, time: '11:00', event: 'Medication administered', type: 'medication' }
      ]);
    }
  }, [searchParams]);

  return (
    <div className="dashboard-container">
      {/* Patient Info Section */}
      <div className="patient-info-section">
        {patient ? (
          <>
            <h2 className="patient-name">{patient.name}</h2>
            <div className="patient-details">
              <p><strong>IC/Passport:</strong> {patient.icPassport}</p>
              <p><strong>Admitted:</strong> {patient.admittedDate}</p>
            </div>
          </>
        ) : (
          <h2>No patient selected</h2>
        )}
      </div>

      {/* Main Content Area */}
      <div className="dashboard-content">
        {/* Left Column - Timeline and Vital Signs */}
        <div className="dashboard-left">
          {/* Vital Signs Summary */}
          {patient && (
            <div className="vital-signs-summary">
              <h3>Vital Signs</h3>
              <div className="vital-signs-grid">
                <div className="vital-sign-item">
                  <span className="vital-sign-label">Blood Pressure</span>
                  <span className="vital-sign-value">{patient.vitalSigns.bloodPressure}</span>
                </div>
                <div className="vital-sign-item">
                  <span className="vital-sign-label">Heart Rate</span>
                  <span className="vital-sign-value">{patient.vitalSigns.heartRate}</span>
                </div>
                <div className="vital-sign-item">
                  <span className="vital-sign-label">Respiratory Rate</span>
                  <span className="vital-sign-value">{patient.vitalSigns.respiratoryRate}</span>
                </div>
                <div className="vital-sign-item">
                  <span className="vital-sign-label">Oxygen Saturation</span>
                  <span className="vital-sign-value">{patient.vitalSigns.oxygenSaturation}</span>
                </div>
                <div className="vital-sign-item">
                  <span className="vital-sign-label">Temperature</span>
                  <span className="vital-sign-value">{patient.vitalSigns.temperature}</span>
                </div>
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="timeline-section">
            <h3>Timeline</h3>
            <div className="timeline">
              {timelineEvents.map(event => (
                <div key={event.id} className={`timeline-event ${event.type}`}>
                  <span className="event-time">{event.time}</span>
                  <span className="event-description">{event.event}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - 3D Viewer */}
        <div className="dashboard-right">
          <ThreeDViewer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
