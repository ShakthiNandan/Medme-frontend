import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BloodPressure.css';

const BloodPressure: React.FC = () => {
  const navigate = useNavigate();

  // Systolic & Diastolic default to "0"
  const [systolic, setSystolic] = useState('0');
  const [diastolic, setDiastolic] = useState('0');

  // Timeline array of objects: { label, time }
  const [timeline, setTimeline] = useState<{ label: string; time: string }[]>([]);

  // Save button: update timeline with BP info
  const handleSave = () => {
    const timestamp = new Date().toLocaleString(); // e.g., "3/5/2025, 2:15:30 PM"
    setTimeline((prev) => [
      ...prev,
      {
        label: `Blood Pressure: ${systolic}/${diastolic} mmHg`,
        time: timestamp,
      },
    ]);
  };

  // Next button: also updates timeline, then navigates to next sub-menu option
  const handleNext = () => {
    handleSave();
    // Navigate to the next vital sign page, e.g. Heart Rate
    navigate('/vital-sign/heart-rate');
  };

  return (
    <div className="bp-page-container">
      {/* Top Header */}
      <header className="bp-header">
        <div className="header-left">Menu</div>
        <div className="header-center">Jane Doe</div>
        <div className="header-right">
          <span className="user-icon" role="img" aria-label="User">
            👤
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="bp-main-content">
        {/* Sidebar Menu */}
        <nav className="bp-sidebar">
          <ul>
            <li className="menu-item">Dashboard</li>
            <li className="menu-item expanded">
              Vital Sign
              <ul className="submenu">
                <li className="submenu-item active">Blood Pressure</li>
                <li className="submenu-item">Heart Rate</li>
                <li className="submenu-item">Respiratory Rate</li>
                <li className="submenu-item">Oxygen Saturation</li>
                <li className="submenu-item">Pain Score</li>
                <li className="submenu-item">Temperature</li>
              </ul>
            </li>
          </ul>
        </nav>

        {/* Form & Timeline Section */}
        <main className="bp-form-section">
          <h2>Blood Pressure</h2>
          <div className="bp-form">
            <div className="form-group">
              <label htmlFor="systolic">Systolic Value:</label>
              <input
                id="systolic"
                type="number"
                value={systolic}
                onChange={(e) => setSystolic(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="diastolic">Diastolic Value:</label>
              <input
                id="diastolic"
                type="number"
                value={diastolic}
                onChange={(e) => setDiastolic(e.target.value)}
              />
            </div>

            <div className="unit-label">mmHg</div>

            <div className="button-group">
              <button className="save-btn" onClick={handleSave}>
                SAVE
              </button>
              <button className="next-btn" onClick={handleNext}>
                NEXT
              </button>
            </div>
          </div>

          {/* Scrollable Timeline */}
          <div className="bp-timeline">
            <h3>Timeline</h3>
            <ul>
              {timeline.map((entry, idx) => (
                <li key={idx}>
                  <strong>{entry.label}</strong>
                  <div className="timestamp">{entry.time}</div>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BloodPressure;
