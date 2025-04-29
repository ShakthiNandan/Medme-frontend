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
      {/* Navigation Links */}
      <div className="injuries-navigation">
        <div className="injury-category">
          <h3>Bone Injuries</h3>
          <div className="injury-links">
            <Link to="/app/injuries/bone/open-fracture" className="injury-nav-link">
              Open Fracture
            </Link>
            <Link to="/app/injuries/bone/closed-fracture" className="injury-nav-link">
              Closed Fracture
            </Link>
          </div>
        </div>

        <div className="injury-category">
          <h3>Soft Tissue Injuries</h3>
          <div className="injury-links">
            <Link to="/app/injuries/soft-tissue/laceration" className="injury-nav-link">
              Laceration
            </Link>
            <Link to="/app/injuries/soft-tissue/contusion" className="injury-nav-link">
              Contusion
            </Link>
            <Link to="/app/injuries/soft-tissue/abrasion" className="injury-nav-link">
              Abrasion
            </Link>
          </div>
        </div>
      </div>

      {/* Sub-route content */}
      <div className="injury-form-container">
        <Outlet />
      </div>

      {/* Timeline */}
      <InjuriesTimeline entries={timelineEntries} />
    </div>
  );
};

export default InjuriesMenu;
