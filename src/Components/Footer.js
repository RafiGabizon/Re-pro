import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="link-group">
            <h4 className="link-group-title">מידע</h4>
            <Link to="/About" className="link-item">אודות</Link>
            <Link to="/Contact" className="link-item">צור קשר</Link>
            <Link to="/TermsOfUse" className="link-item">תנאי שימוש</Link>
            <Link to="/Policy" className="link-item">מדיניות פרטיות</Link>
          </div>
          <div className="link-group">
            <h4 className="link-group-title">קישורים נוספים</h4>
            <Link to="/Employers" className="link-item">מעסיקים</Link>
            <Link to="/JobsAbroad" className="link-item">עבודות בחו"ל</Link>
            <Link to="/Articles" className="link-item">כתבות</Link>
            <Link to="/QustionAsk" className="link-item">שאלות ותשובות</Link>
            <Link to="/LogIn" className="link-item">איזור אישי</Link>
            <Link to="/admin" className="link-item">איזור ניהול</Link>
          </div>
        </div>
        <div className="social-and-credits">
          <div className="social-icons">
            <a href="https://wa.link/oc0fb6" className="social-icon" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
            <a href="https://www.tiktok.com/" className="social-icon" aria-label="TikTok">
              <FaTiktok />
            </a>
            <a href="https://www.instagram.com/" className="social-icon" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com/" className="social-icon" aria-label="Facebook">
              <FaFacebook />
            </a>
          </div>
          <div className="credits">
            <p>© 2024 כל הזכויות שמורות | פותח על ידי אלמוג ורפי</p>
          </div>
        </div>
      </div>
    </footer>
  );
}