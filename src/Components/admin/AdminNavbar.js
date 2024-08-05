import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/admin/adminNavbar.css';
import Repro from '../../images/Repro_Logo.jpg';

export default function AdminNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="admin-navbar">
      <div className="admin-nav-content">
        <Link to="/admin" className="admin-logo-link">
          <img src={Repro} className="admin-logo" alt="ניהול" title="ניהול Re_Pro" />
        </Link>

        <div className={`admin-menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav className={`admin-links ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/admin/jobs" className="admin-nav-link" onClick={closeMenu}>ניהול ואישור משרות</Link>
          <Link to="/admin/hot-jobs" className="admin-nav-link" onClick={closeMenu}>ניהול משרות חמות</Link>
          <Link to="/admin/manageUsers" className="admin-nav-link" onClick={closeMenu}>ניהול משתמשים</Link>
          <Link to="/admin/articles" className="admin-nav-link" onClick={closeMenu}>ניהול כתבות</Link>
          <Link to="/admin/manageHome" className="admin-nav-link" onClick={closeMenu}>ניהול תוכן האתר</Link>
          <Link to="/" className="admin-nav-link admin-login-button" onClick={closeMenu}>חזרה לאתר</Link>
        </nav>
      </div>
    </div>
  );
}