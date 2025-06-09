import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
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
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [vitalDropdownOpen, setVitalDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [timelineEvents, setTimelineEvents] = useState<any[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<'bio' | 'emergencies' | 'vitals' | 'historical'>('bio');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
      <header>
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
      </header>

      <div className="dashboard-body">
        {isMenuOpen && (
          <nav className="side-menu">
            <ul>
              <li onClick={() => navigate('/dashboard')}>Dashboard</li>
              <li>
                <button
                  className="dropdown-btn"
                  onClick={() => setVitalDropdownOpen((open) => !open)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    background: 'none',
                    border: '1px solid #ccc',
                    borderRadius: '6px',
                    padding: '8px',
                    marginBottom: '6px',
                    cursor: 'pointer',
                  }}
                >
                  Vital Sign {vitalDropdownOpen ? '▲' : '▼'}
                </button>
                {vitalDropdownOpen && (
                  <ul className="dropdown-list" style={{ paddingLeft: '10px', margin: 0 }}>
                    <li onClick={() => navigate('/vital-signs/blood-pressure')}>Blood Pressure</li>
                    <li onClick={() => navigate('/vital-signs/heart-rate')}>Heart Rate</li>
                    <li onClick={() => navigate('/vital-signs/respiratory-rate')}>Respiratory Rate</li>
                    <li onClick={() => navigate('/vital-signs/oxygen-saturation')}>Oxygen Saturation</li>
                    <li onClick={() => navigate('/vital-signs/pain-score')}>Pain Score</li>
                    <li onClick={() => navigate('/vital-signs/temperature')}>Temperature</li>
                  </ul>
                )}
              </li>
              <li onClick={() => navigate('/patient-type')}>Patients</li>
              <li onClick={() => navigate('/intravenous-access')}>Intravenous Access</li>
              <li onClick={() => navigate('/oxygen-delivery')}>Oxygen Delivery</li>
              <li onClick={() => navigate('/drugs')}>Drugs</li>
              <li onClick={() => navigate('/fluid')}>Fluids</li>
              <li onClick={() => navigate('/injuries')}>Injuries</li>
              <li onClick={() => navigate('/cprmenu')}>CPR</li>
              <li onClick={() => navigate('/intubation')}>Intubation</li>
              <li onClick={() => navigate('/toilet-suturing')}>Toilet & Suturing</li>
              <li onClick={() => navigate('/procedure')}>Procedure</li>
              <li onClick={() => navigate('/referral')}>Referral</li>
              <li onClick={() => navigate('/report')}>Report</li>
            </ul>
          </nav>
        )}

        <main className="main-content">
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
          <ThreeDViewer selectedMenu={selectedMenu} />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
