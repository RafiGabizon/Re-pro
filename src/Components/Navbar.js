// src/components/Navbar.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import Repro from '../images/Repro_Logo.jpg';
import { FaWhatsapp } from 'react-icons/fa';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="navbar">
      <div className="nav-content">
        {/* Logo */}
        <Link to="/" className="logo-link">
          <img src={Repro} className="logo" alt="Home Page" title="Re_Pro" />
        </Link>

        {/* Navigation Links */}
        <nav className={`links ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/About" className="nav-link" onClick={closeMenu}>
            אודות
          </Link>
          <div className="nav-group">
            <Link to="/QustionAsk" className="nav-link" onClick={closeMenu}>
              שאלות תשובות
            </Link>
            <Link to="/JobsAbroad" className="nav-link" onClick={closeMenu}>
              עבודות בחו"ל
            </Link>
          </div>
          <Link to="/Articles" className="nav-link" onClick={closeMenu}>
            כתבות
          </Link>
          <Link to="/Employers" className="nav-link" onClick={closeMenu}>
            מעסיקים
          </Link>
        </nav>

        {/* Right-side Buttons */}
        <div className="right-buttons">
          <a href="https://wa.link/oc0fb6" className="whatsapp-link">
            <FaWhatsapp className="fa-whatsapp" />
          </a>
          <Link to="/JobPosting" className="jobPosting-button" onClick={closeMenu}>
            פרסום משרה
          </Link>
          <Link to="/Login" className="register-button" onClick={closeMenu}>
            להרשמה
          </Link>
        </div>

        {/* Menu Icon */}
        <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}
