import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import './Layout.css';

const Layout: React.FC = () => {
  const [showVitalsMenu, setShowVitalsMenu] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTablet, setIsTablet] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsTablet(window.innerWidth <= 1024);
      if (window.innerWidth <= 1024) {
        setIsSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    // Implement logout logic here
    navigate('/');
  };

  return (
    <div className="layout-container">
      {/* Global Top Bar */}
      <header className="top-bar">
        <div className="top-bar-left">
          <button 
            className="menu-icon" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle menu"
          >
            {isSidebarOpen ? '✕' : '☰'}
          </button>
        </div>
        <div className="top-bar-center">MedMe</div>
        <div className="top-bar-right">
          <span className="user-name">Jane Doe</span>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </header>

      <div className="main-container">
        {/* Global Sidebar */}
        <nav className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
          <ul>
            <li className={`menu-item ${isActive('/app/dashboard') ? 'active' : ''}`}>
              <Link to="/app/dashboard" onClick={() => isTablet && setIsSidebarOpen(false)}>
                Dashboard
              </Link>
            </li>
            <li className={`menu-item ${isActive('/app/cpr') ? 'active' : ''}`}>
              <Link to="/app/cpr" onClick={() => isTablet && setIsSidebarOpen(false)}>
                CPR
              </Link>
            </li>
            <li className={`menu-item ${showVitalsMenu ? 'expanded' : ''}`} onClick={() => setShowVitalsMenu(!showVitalsMenu)}>
              <span>Vital Signs</span>
              <span className="arrow">{showVitalsMenu ? '▼' : '▶'}</span>
            </li>
            {showVitalsMenu && (
              <ul className="submenu">
                <li className="submenu-item">
                  <Link to="/app/vital-signs/blood-pressure" onClick={() => isTablet && setIsSidebarOpen(false)}>
                    Blood Pressure
                  </Link>
                </li>
                <li className="submenu-item">
                  <Link to="/app/vital-signs/heart-rate" onClick={() => isTablet && setIsSidebarOpen(false)}>
                    Heart Rate
                  </Link>
                </li>
                <li className="submenu-item">
                  <Link to="/app/vital-signs/respiratory-rate" onClick={() => isTablet && setIsSidebarOpen(false)}>
                    Respiratory Rate
                  </Link>
                </li>
                <li className="submenu-item">
                  <Link to="/app/vital-signs/oxygen-saturation" onClick={() => isTablet && setIsSidebarOpen(false)}>
                    Oxygen Saturation
                  </Link>
                </li>
                <li className="submenu-item">
                  <Link to="/app/vital-signs/temperature" onClick={() => isTablet && setIsSidebarOpen(false)}>
                    Temperature
                  </Link>
                </li>
              </ul>
            )}
            <li className={`menu-item ${isActive('/app/patient-type') ? 'active' : ''}`}>
              <Link to="/app/patient-type" onClick={() => isTablet && setIsSidebarOpen(false)}>
                Patients
              </Link>
            </li>
            <li className={`menu-item ${isActive('/app/intravenous-access') ? 'active' : ''}`}>
              <Link to="/app/intravenous-access" onClick={() => isTablet && setIsSidebarOpen(false)}>
                Intravenous Access
              </Link>
            </li>
            <li className={`menu-item ${isActive('/app/oxygen-delivery') ? 'active' : ''}`}>
              <Link to="/app/oxygen-delivery" onClick={() => isTablet && setIsSidebarOpen(false)}>
                Oxygen Delivery
              </Link>
            </li>
            <li className={`menu-item ${isActive('/app/drugs') ? 'active' : ''}`}>
              <Link to="/app/drugs" onClick={() => isTablet && setIsSidebarOpen(false)}>
                Drugs
              </Link>
            </li>
            <li className={`menu-item ${isActive('/app/fluid') ? 'active' : ''}`}>
              <Link to="/app/fluid" onClick={() => isTablet && setIsSidebarOpen(false)}>
                Fluids
              </Link>
            </li>
            <li className={`menu-item ${isActive('/app/injuries') ? 'active' : ''}`}>
              <Link to="/app/injuries" onClick={() => isTablet && setIsSidebarOpen(false)}>
                Injuries
              </Link>
            </li>
            <li className={`menu-item ${isActive('/app/intubation') ? 'active' : ''}`}>
              <Link to="/app/intubation" onClick={() => isTablet && setIsSidebarOpen(false)}>
                Intubation
              </Link>
            </li>
            <li className={`menu-item ${isActive('/app/toilet-suturing') ? 'active' : ''}`}>
              <Link to="/app/toilet-suturing" onClick={() => isTablet && setIsSidebarOpen(false)}>
                Toilet & Suturing
              </Link>
            </li>
            <li className={`menu-item ${isActive('/app/procedure') ? 'active' : ''}`}>
              <Link to="/app/procedure" onClick={() => isTablet && setIsSidebarOpen(false)}>
                Procedure
              </Link>
            </li>
            <li className={`menu-item ${isActive('/app/referral') ? 'active' : ''}`}>
              <Link to="/app/referral" onClick={() => isTablet && setIsSidebarOpen(false)}>
                Referral
              </Link>
            </li>
          </ul>
        </nav>

        {/* Unique Page Content Rendered Here */}
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
