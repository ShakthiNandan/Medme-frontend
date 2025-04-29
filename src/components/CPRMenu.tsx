// src/components/CPRMenu.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './CPRMenu.css';

const CPRMenu: React.FC = () => {
  return (
    <div className="cpr-menu-container">
      <h1 className="cpr-menu-title">CPR Options</h1>
      <div className="cpr-options-grid">
        <Link to="/app/cpr/assisted" className="cpr-option-card">
          <h2>Assisted CPR</h2>
          <p>Use mechanical assistance for CPR</p>
        </Link>
        
        <Link to="/app/cpr/manual" className="cpr-option-card">
          <h2>Manual CPR</h2>
          <p>Perform CPR manually</p>
        </Link>
        
        <Link to="/app/cpr/manual-intubated" className="cpr-option-card">
          <h2>Manual Intubated CPR</h2>
          <p>Perform CPR with intubation</p>
        </Link>
      </div>
    </div>
  );
};

export default CPRMenu;
