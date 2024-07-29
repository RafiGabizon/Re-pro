import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import Repro from '../images/Repro_Logo.jpg';
import { FaWhatsapp } from "react-icons/fa";

export default function NavbarTop() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar">
      <div className="nav-content">
        <Link to="/" className="logo-link">
          <img src={Repro} className="logo" alt="דף בית" title="Re_Pro" />
        </Link>

        <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav className={`links ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/JobsAbroad" className="nav-link">עבודות בחו"ל</Link>
          <Link to="/Employers" className="nav-link">מעסיקים</Link>
          <Link to="/Articles" className="nav-link">כתבות</Link>
          <Link to="/QustionAsk" className="nav-link">שאלות ותשובות</Link>
          <Link to="/About" className="nav-link">אודות</Link>
          <Link to="/LogIn" className="nav-link login-button">איזור אישי</Link>
        </nav>

        <Link to="https://wa.link/oc0fb6" className="whatsapp-link">
         <FaWhatsapp className='fa-whatsapp' />
        </Link>
      </div>
    </div>
  );
}