// src/components/Dashboard.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThreeDViewer from './ThreeDViewer';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
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
              <li onClick={() => navigate('/patient-type')}>Patients</li>
              <li onClick={() => navigate('/vitals')}>Vital Signs</li>
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
