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
  const [selectedMenu, setSelectedMenu] = useState<'bio' | 'emergencies' | 'vitals' | 'historical'>('bio');

  useEffect(() => {
    const patientId = searchParams.get('patientId');
    if (patientId) {
      // In a real app, fetch patient data from API
      // fetch(`/api/patients/${patientId}`).then(...)

      // Mock patient data
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
    <div className="dashboard-content">
      <div className="main-content">
        {/* Left Column - Timeline and Vital Signs */}
        <div className="timeline">
          <h3>Timeline</h3>
          <div className="timeline-list">
            {timelineEvents.map(event => (
              <div key={event.id} className={`timeline-event ${event.type}`}>
                <span className="event-time">{event.time}</span>
                <span className="event-description">{event.event}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - 3D Viewer */}
        <div className="dashboard-right">
          {/* Menu Selection */}
          <div className="viewer-menu">
            <button 
              className={`menu-button ${selectedMenu === 'bio' ? 'active' : ''}`}
              onClick={() => setSelectedMenu('bio')}
            >
              Bio Data
            </button>
            <button 
              className={`menu-button ${selectedMenu === 'emergencies' ? 'active' : ''}`}
              onClick={() => setSelectedMenu('emergencies')}
            >
              Emergencies
            </button>
            <button 
              className={`menu-button ${selectedMenu === 'vitals' ? 'active' : ''}`}
              onClick={() => setSelectedMenu('vitals')}
            >
              Vitals
            </button>
            <button 
              className={`menu-button ${selectedMenu === 'historical' ? 'active' : ''}`}
              onClick={() => setSelectedMenu('historical')}
            >
              Historical
            </button>
          </div>
          <ThreeDViewer selectedMenu={selectedMenu} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
