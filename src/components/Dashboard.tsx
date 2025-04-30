// src/components/Dashboard.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThreeDViewer from './ThreeDViewer';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [vitalDropdownOpen, setVitalDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <button className="menu-icon" onClick={toggleMenu}>☰</button>
        <div className="patient-name">Jane Doe</div>
        <div className="user-menu">
          <div className="user-icon">👤</div>
          <div className="user-info">
            <span className="doctor-name">Dr. John Doe</span>
            <button className="logout-button" onClick={handleLogout}>
              Log Out
            </button>
          </div>
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
            <p>Placeholder for timeline content or events...</p>
          </div>
          <div className="dashboard-right">
            <ThreeDViewer />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
