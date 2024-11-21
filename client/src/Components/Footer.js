// Importing necessary dependencies and styles
import React from 'react'; // Import React to enable JSX syntax
import { Link } from 'react-router-dom'; // Import Link component for navigation
import '../styles/footer.css'; // Import CSS for styling the footer
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa'; // Importing Font Awesome icons for social media

// Functional component for rendering the footer
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Group of informational links */}
          <div className="link-group">
            <h4 className="link-group-title">מידע</h4> {/* Section title */}
            <Link to="/About" className="link-item">אודות</Link> {/* About link */}
            <Link to="/Contact" className="link-item">צור קשר</Link> {/* Contact link */}
            <Link to="/TermsOfUse" className="link-item">תנאי שימוש</Link> {/* Terms of Use link */}
            <Link to="/Policy" className="link-item">מדיניות פרטיות</Link> {/* Privacy Policy link */}
          </div>
          {/* Group of additional links */}
          <div className="link-group">
            <h4 className="link-group-title">קישורים נוספים</h4> {/* Section title */}
            <Link to="/Employers" className="link-item">מעסיקים</Link> {/* Employers link */}
            <Link to="/JobsAbroad" className="link-item">עבודות בחו"ל</Link> {/* Jobs Abroad link */}
            <Link to="/Articles" className="link-item">כתבות</Link> {/* Articles link */}
            <Link to="/QustionAsk" className="link-item">שאלות ותשובות</Link> {/* FAQ link */}
            <Link to="/LogIn" className="link-item">איזור אישי</Link> {/* Personal Area link */}
            <Link to="/admin" className="link-item">איזור ניהול</Link> {/* Admin Area link */}
          </div>
        </div>
        {/* Social media icons section */}
        <div className="social-and-credits">
          <div className="social-icons">
            {/* WhatsApp icon */}
            <a href="https://wa.link/oc0fb6" className="social-icon" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
            {/* TikTok icon */}
            <a href="https://www.tiktok.com/" className="social-icon" aria-label="TikTok">
              <FaTiktok />
            </a>
            {/* Instagram icon */}
            <a href="https://www.instagram.com/" className="social-icon" aria-label="Instagram">
              <FaInstagram />
            </a>
            {/* Facebook icon */}
            <a href="https://www.facebook.com/" className="social-icon" aria-label="Facebook">
              <FaFacebook />
            </a>
          </div>
        </div>
      </div>
      {/* Footer credits section */}
      <div className="credits">
        <p>© 2024 כל הזכויות שמורות | פותח על ידי אלמוג ורפי</p> {/* Copyright notice */}
      </div>
    </footer>
  );
}
