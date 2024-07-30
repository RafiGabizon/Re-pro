import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/admin/adminNavbar.css';
import Repro from '../../images/Repro_Logo.jpg';

export default function AdminNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
          <Link to="/admin/jobs" className="admin-nav-link">ניהול ואישור משרות</Link>
          <Link to="/admin/hot-jobs" className="admin-nav-link">ניהול משרות חמות</Link>
          <Link to="/admin/users" className="admin-nav-link">ניהול משתמשים</Link>
          <Link to="/admin/articles" className="admin-nav-link">ניהול כתבות</Link>
          <Link to="/admin/content" className="admin-nav-link">ניהול תוכן האתר</Link>
          <Link to="/" className="admin-nav-link admin-login-button">חזרה לאתר</Link>
        </nav>
      </div>
    </div>
  );
}