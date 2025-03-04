// src/components/FluidMenu/FluidMenu.tsx
import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import FluidTimeline from './FluidTimeline';
import './FluidMenu.css';

const FluidMenu: React.FC = () => {
  const [showFluidSubmenu, setShowFluidSubmenu] = useState(false);

  // Toggle the Fluid submenu
  const handleFluidClick = () => {
    setShowFluidSubmenu(!showFluidSubmenu);
  };

  return (
    <div className="fluid-menu-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <p className="menu-title">Menu</p>
        </div>
        <ul className="menu-list">
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <button onClick={handleFluidClick} className="submenu-toggle">
              Fluid
            </button>
            {showFluidSubmenu && (
              <ul className="submenu">
                <li>
                  <Link to="/fluid/crystalloid">Crystalloid</Link>
                </li>
                <li>
                  <Link to="/fluid/colloid">Colloid</Link>
                </li>
                <li>
                  <Link to="/fluid/blood-product">Blood Product</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Top Bar */}
        <div className="top-bar">
          <span className="username">Jane Doe</span>
          <span className="user-icon">👤</span>
        </div>

        {/* Sub-route content (Crystalloid, Colloid, or Blood Product) */}
        <div className="fluid-form-container">
          <Outlet />
        </div>

        {/* Timeline (optional) */}
        <FluidTimeline />
      </div>
    </div>
  );
};

export default FluidMenu;
