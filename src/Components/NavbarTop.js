import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';
import images from '../images/Repro_Logo.jpg';

export default function NavbarTop() {
  return (
    <div className="navbar">
      <div className="log_in_Link">
        <Link to="/LogIn" className="Link-7">איזור אישי</Link>
      </div>
      <nav className="links">

        <Link to="/" className="Link-1">
          <img src={images} className="logo" alt="דף בית" title='Re_Pro' />
        </Link>

        <div className="left-links">
          <Link to="/Jobs_Abroad" className="Link-5">עבודות בחו"ל</Link>
          <Link to="/Employers" className="Link-4">מעסיקים</Link>
          <Link to="/Articles" className="Link-3">כתבות</Link>
          <Link to="/Qustion_Ask" className="Link-2">שאלות ותשובות</Link>
          <Link to="/About" className="Link-6">אודות</Link>
        </div>
      </nav>
    </div>
  );
}
