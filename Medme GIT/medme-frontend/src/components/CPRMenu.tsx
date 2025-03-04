
// src/components/CPRMenu.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CPRMenu.css';

const CPRMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="cpr-menu">
      <div className="cpr-menu-title" onClick={toggleMenu}>
        CPR {isOpen ? '▲' : '▼'}
      </div>
      {isOpen && (
        <ul className="cpr-submenu">
          <li>
            <Link to="/cpr/assisted">Assisted CPR</Link>
          </li>
          <li>
            <Link to="/cpr/manual">Manual</Link>
          </li>
          <li>
            <Link to="/cpr/manual-intubated">Manual Intubated</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default CPRMenu;
