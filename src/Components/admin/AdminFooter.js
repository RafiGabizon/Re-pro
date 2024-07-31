import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/admin/adminFooter.css';
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';

export default function AdminFooter() {
  return (
    <footer className="admin-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="link-group">
            <Link to="/admin/jobs" className="link-item">ניהול ואישור משרות</Link>
            <Link to="/admin/hot-jobs" className="link-item">ניהול משרות חמות</Link>
            <Link to="/admin/users" className="link-item">ניהול משתמשים</Link>
            <Link to="/admin/articles" className="link-item">ניהול כתבות</Link>
            <Link to="/admin/content" className="link-item">ניהול תוכן האתר</Link>
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
        </div>
      </div>
      <div className="admin-credits">
        <p>© 2024 כל הזכויות שמורות | פותח על ידי אלמוג ורפי</p>
      </div>
    </footer>
  );
}