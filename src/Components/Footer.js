import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';
import facebook_logo from '../images/facebook_logo.png';
import instagram_logo from '../images/instagram_logo.png';
import tiktok_logo from '../images/tiktok_logo.png';
import whatsapp_logo from '../images/whatsapp_logo.png';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
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
          <Link to="/Jobs_Abroad" className="link-item">עבודות בחו"ל</Link>
          <Link to="/Articles" className="link-item">כתבות</Link>
          <Link to="/Qustion_Ask" className="link-item">שאלות ותשובות</Link>
          <Link to="/LogIn" className="link-item">איזור אישי</Link>
        </div>
        <div className="icon-group">
          <a href="https://wa.link/oc0fb6">
            <img src={whatsapp_logo} className="social-icon" alt="WhatsApp" />
          </a>
          <a href="https://www.tiktok.com/">
            <img src={tiktok_logo} className="social-icon" alt="TikTok" />
          </a>
          <a href="https://www.instagram.com/">
            <img src={instagram_logo} className="social-icon" alt="Instagram" />
          </a>
          <a href="https://www.facebook.com/">
            <img src={facebook_logo} className="social-icon" alt="Facebook" />
          </a>
        </div>
      </div>
      <div className="credits">
        <p>© 2024 כל הזכויות שמורות | פותח על ידי [אלמוג ורפי]</p>
      </div>
    </footer>
  );
}
