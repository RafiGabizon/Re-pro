import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/navbar.css';
import Repro from '../images/Repro_Logo.jpg';
import { FaWhatsapp } from "react-icons/fa";

export default function NavbarTop() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };
    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handlePostJobClick = (e) => {
    e.preventDefault();
    closeMenu();
    if(isLoggedIn) {
      navigate('/postJob');
    }
    else {
      navigate('/jobPosting');
    }
  }

  const handleProfileClick = (e) => {
    e.preventDefault();
    closeMenu();
    if (isLoggedIn) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
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
          <div className="nav-group">
            <Link to="/JobsAbroad" className="nav-link" onClick={closeMenu}>
              עבודות בחו"ל
            </Link>
            <Link to="/Articles" className="nav-link" onClick={closeMenu}>
              כתבות
            </Link>
            <Link to="/QustionAsk" className="nav-link" onClick={closeMenu}>
              שאלות ותשובות
            </Link>
            <Link to="/About" className="nav-link" onClick={closeMenu}>
              אודות
            </Link>
          </div>
          
            <Link to="https://wa.link/oc0fb6" className="whatsapp-link">
              <FaWhatsapp />
            </Link>
          <div className="action-buttons">
            <Link to='JobPosting' className="action-button" onClick={handlePostJobClick}>
              פרסום משרה
            </Link>
            <Link 
              to={isLoggedIn ? '/profile' : '/login'} 
              className="action-button" 
              onClick={handleProfileClick}
            >
              {isLoggedIn ? 'אזור אישי' : 'התחברות'}
            </Link>
          </div>
        </nav>

      </div>
    </div>
  );
}