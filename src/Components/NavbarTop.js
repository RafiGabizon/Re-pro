import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css'; 

export default function NavbarTop() {
  return (
    <div className="navbar">
      <h1 className="title"></h1>
      <nav className="links">
        <div className="log_in_Link">
          <Link to="/LogIn" className="Link-7">איזור אישי</Link>
        </div>

        <div className="left-links">
          <Link to="/" className="Link-1">
            <img src="../assets/Repro_Logo.jpg" className="logo" alt="דף בית" />
          </Link>
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
