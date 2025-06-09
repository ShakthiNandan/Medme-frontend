import React from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import './VitalSigns.css';
import { useTimeline } from '../../context/TimelineContext';
import './PainScore.css';

const VitalSigns: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { timeline } = useTimeline();

  const vitalSignMenus = [
    { id: 'blood-pressure', label: 'Blood Pressure' },
    { id: 'heart-rate', label: 'Heart Rate' },
    { id: 'respiratory-rate', label: 'Respiratory Rate' },
    { id: 'oxygen-saturation', label: 'Oxygen Saturation' },
    { id: 'pain-score', label: 'Pain Score' },
    { id: 'temperature', label: 'Temperature' }
  ];

  const handleMenuClick = (menuId: string) => {
    navigate(`/vital-signs/${menuId}`);
  };

  // Helper function to determine if a menu item is active
  const isMenuActive = (menuId: string) => {
    return location.pathname.includes(menuId);
  };

  return (
    <div className="vital-signs-container">
      <div className="vital-signs-sidebar">
        {/* Dashboard always at the top */}
        <button
          className="dashboard-menu-item"
          onClick={() => navigate('/dashboard')}
        >
          Dashboard
        </button>
        <hr className="sidebar-divider" />
        {/* Vital Signs submenu */}
        {vitalSignMenus.map((menu, idx) => (
          <React.Fragment key={menu.id}>
            <button
              className={`vital-signs-menu-item ${isMenuActive(menu.id) ? 'active' : ''}`}
              onClick={() => handleMenuClick(menu.id)}
            >
              {menu.label}
            </button>
            <hr className="sidebar-divider" />
          </React.Fragment>
        ))}
      </div>
      <div className="vital-signs-content">
        {/* Timeline */}
        <div className="timeline-list" style={{ maxHeight: 150, overflowY: 'auto', marginBottom: 20 }}>
          {timeline.map((entry, idx) => (
            <div key={idx} style={{ borderBottom: '1px solid #eee', padding: '4px 0' }}>
              <b>{entry.type}</b>: {entry.value} {entry.unit}
              <br />
              <small>{new Date(entry.timestamp).toLocaleString()}</small>
              {entry.prescribedBy && (
                <div>
                  <small>
                    Prescribed By: {entry.prescribedBy} | Staff: {entry.staffCategory} | Keyed In By: {entry.keyedInBy}
                  </small>
                </div>
              )}
            </div>
          ))}
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default VitalSigns; 