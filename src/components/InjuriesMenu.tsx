// src/components/InjuriesMenu/InjuriesMenu.tsx
import React from 'react';
import './InjuriesMenu.css';

const InjuriesMenu: React.FC = () => {
  return (
    <div className="injuries-menu">
      <h2>Injuries Menu</h2>
      <div className="injuries-grid">
        <div className="injury-category">
          <h3>Bone Injuries</h3>
          <button className="injury-button">Open Fracture</button>
          <button className="injury-button">Closed Fracture</button>
          <button className="injury-button">Dislocation</button>
        </div>
        <div className="injury-category">
          <h3>Soft Tissue Injuries</h3>
          <button className="injury-button">Laceration</button>
          <button className="injury-button">Contusion</button>
          <button className="injury-button">Abrasion</button>
        </div>
        <div className="injury-category">
          <h3>Other Injuries</h3>
          <button className="injury-button">Burn</button>
        </div>
      </div>
    </div>
  );
};

export default InjuriesMenu;
