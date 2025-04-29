// src/components/FluidMenu/FluidMenu.tsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import FluidTimeline from './FluidTimeline';
import './FluidMenu.css';

const FluidMenu: React.FC = () => {
  return (
    <div className="fluid-menu-container">
      {/* Navigation Links */}
      <div className="fluid-navigation">
        <Link to="/app/fluid/crystalloid" className="fluid-nav-link">
          Crystalloid
        </Link>
        <Link to="/app/fluid/colloid" className="fluid-nav-link">
          Colloid
        </Link>
        <Link to="/app/fluid/blood-product" className="fluid-nav-link">
          Blood Product
        </Link>
      </div>

      {/* Sub-route content (Crystalloid, Colloid, or Blood Product) */}
      <div className="fluid-form-container">
        <Outlet />
      </div>

      {/* Timeline (optional) */}
      <FluidTimeline />
    </div>
  );
};

export default FluidMenu;
