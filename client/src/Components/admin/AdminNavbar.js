// Importing necessary dependencies and assets
import React, { useState } from 'react'; // Import React and the useState hook for managing state
import { Link } from 'react-router-dom'; // Import Link component for navigation
import '../../styles/admin/adminNavbar.css'; // Import CSS for styling the navbar component
import Repro from '../../images/Repro_Logo.jpg'; // Importing the logo image

// Functional component for rendering the AdminNavbar
export default function AdminNavbar() {
  // State to manage the visibility of the menu in mobile view
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu's open/close state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to close the menu when a link is clicked
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="admin-navbar">
      <div className="admin-nav-content">
        {/* Logo linking back to the admin dashboard */}
        <Link to="/admin" className="admin-logo-link">
          <img src={Repro} className="admin-logo" alt="ניהול" title="ניהול Re_Pro" />
        </Link>

        {/* Hamburger menu icon for mobile view */}
        <div className={`admin-menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navigation links for the admin panel */}
        <nav className={`admin-links ${isMenuOpen ? 'open' : ''}`}>
          {/* Each link navigates to a specific admin management section */}
          <Link to="/admin/jobs" className="admin-nav-link" onClick={closeMenu}>ניהול ואישור משרות</Link>
          <Link to="/admin/hot-jobs" className="admin-nav-link" onClick={closeMenu}>ניהול משרות חמות</Link>
          <Link to="/admin/users" className="admin-nav-link" onClick={closeMenu}>ניהול משתמשים</Link>
          <Link to="/admin/articles" className="admin-nav-link" onClick={closeMenu}>ניהול כתבות</Link>
          <Link to="/admin/manageHome" className="admin-nav-link" onClick={closeMenu}>ניהול תוכן האתר</Link>
          {/* Link to navigate back to the main website */}
          <Link to="/" className="admin-nav-link admin-login-button" onClick={closeMenu}>חזרה לאתר</Link>
        </nav>
      </div>
    </div>
  );
}
