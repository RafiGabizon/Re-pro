import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import Repro from '../images/Repro_Logo.jpg';
import Whatsapp from '../images/whatsapp_logo.png';

export default function NavbarTop() {
  return (
    <div className="navbar">
      <nav className="links">
        <div className="left-links">
          <Link to="/Jobs_Abroad" className="Link-5">עבודות בחו"ל</Link>
          <Link to="/Employers" className="Link-4">מעסיקים</Link>
          <Link to="/Articles" className="Link-3">כתבות</Link>
          <Link to="/Qustion_Ask" className="Link-2">שאלות ותשובות</Link>
          <Link to="/About" className="Link-6">אודות</Link>
        </div>
      </nav>

      <Link to="/">
        <img src={Repro} className="logo" alt="דף בית" title="Re_Pro" />
      </Link>

      <div>
        <Link to="https://wa.link/oc0fb6">
          <img src={Whatsapp} className="Whatsapp" alt="דף בית" title="Re_Pro" />
        </Link>
      </div>

      <div className="log_in_Link">
        <Link to="/LogIn" className="log_in_Link">איזור אישי</Link>
      </div>

    </div>
  );
}