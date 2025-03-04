// src/components/InjuriesMenu/InjuriesMenu.tsx
import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import InjuriesTimeline from './InjuriesTimeline';
import './InjuriesMenu.css';

const InjuriesMenu: React.FC = () => {
  const navigate = useNavigate();

  // State to track open/close of submenus
  const [showBoneSubmenu, setShowBoneSubmenu] = useState(false);
  const [showSoftTissueSubmenu, setShowSoftTissueSubmenu] = useState(false);

  // Timeline data (in a real app, you might store this in Redux or context)
  const [timelineEntries, setTimelineEntries] = useState<string[]>([]);

  // Toggle submenus
  const handleBoneClick = () => {
    setShowBoneSubmenu(!showBoneSubmenu);
  };
  const handleSoftTissueClick = () => {
    setShowSoftTissueSubmenu(!showSoftTissueSubmenu);
  };

  // Add an entry to the timeline
  const addToTimeline = (entry: string) => {
    const timestamp = new Date().toLocaleString();
    setTimelineEntries((prev) => [...prev, `${entry} @ ${timestamp}`]);
  };

  // Menu handlers for items that do NOT have a dedicated route
  const handleClosedFracture = () => {
    addToTimeline('Closed Fracture noted');
  };

  const handleDislocation = () => {
    addToTimeline('Dislocation noted');
  };

  const handleSoftTissueOpen = () => {
    addToTimeline('Soft Tissue Injury (Open) noted');
  };

  const handleSoftTissueClosed = () => {
    addToTimeline('Soft Tissue Injury (Closed) noted');
  };

  const handleBurn = () => {
    addToTimeline('Burn noted');
  };

  return (
    <div className="injuries-menu-container">
      {/* Sidebar */}
      <div className="sidebar">
        <p className="menu-title">Menu</p>
        <ul className="menu-list">
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <button onClick={() => navigate('/injuries')}>Injuries</button>
            {/* Expand sub-menus under Injuries */}
            <ul className="submenu">
              <li>
                <button onClick={handleBoneClick} className="submenu-toggle">
                  Bone
                </button>
                {showBoneSubmenu && (
                  <ul className="submenu">
                    <li>
                      {/* Link to open fracture route */}
                      <Link to="/injuries/bone/open-fracture">Open Fracture</Link>
                    </li>
                    <li>
                      {/* No route for closed fracture, just timeline */}
                      <button onClick={handleClosedFracture}>Closed Fracture</button>
                    </li>
                    <li>
                      <button onClick={handleDislocation}>Dislocation</button>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <button onClick={handleSoftTissueClick} className="submenu-toggle">
                  Soft Tissue Injuries
                </button>
                {showSoftTissueSubmenu && (
                  <ul className="submenu">
                    <li>
                      <button onClick={handleSoftTissueOpen}>Open</button>
                    </li>
                    <li>
                      <button onClick={handleSoftTissueClosed}>Closed</button>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <button onClick={handleBurn}>Burn</button>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="main-content">
        <div className="top-bar">
          <span className="username">Jane Doe</span>
          <span className="user-icon">👤</span>
        </div>

        {/* Outlet for sub-routes (e.g., Open Fracture) */}
        <div className="injuries-content">
          <Outlet />
        </div>

        {/* Timeline */}
        <InjuriesTimeline entries={timelineEntries} />
      </div>
    </div>
  );
};

export default InjuriesMenu;
