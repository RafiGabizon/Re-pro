// Importing necessary dependencies and components
import React from 'react'; // Import React to enable JSX syntax
import { Link } from 'react-router-dom'; // Import Link component for navigation between pages
import '../../styles/admin/adminFooter.css'; // Importing CSS for styling the footer component
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa'; // Importing icons for social media from Font Awesome

// Functional component for rendering the AdminFooter
export default function AdminFooter() {
  return (
    // The footer element wraps the entire footer content
    <footer className="admin-footer">
      <div className="footer-container">
        {/* Content for the footer, including navigation links and social icons */}
        <div className="footer-content">
          <div className="link-group">
            {/* Navigation links to various admin management sections */}
            <Link to="/admin/jobs" className="link-item">ניהול ואישור משרות</Link>
            <Link to="/admin/hot-jobs" className="link-item">ניהול משרות חמות</Link>
            <Link to="/admin/users" className="link-item">ניהול משתמשים</Link>
            <Link to="/admin/articles" className="link-item">ניהול כתבות</Link>
            <Link to="/admin/manageHome" className="link-item">ניהול תוכן האתר</Link>
            <Link to="/admin" className="link-item">איזור ניהול</Link>
          </div>
        </div>
        <div className="social-and-credits">
          {/* Social media icons with links */}
          <div className="social-icons">
            <a href="https://wa.link/oc0fb6" className="social-icon" aria-label="WhatsApp">
              <FaWhatsapp /> {/* WhatsApp icon */}
            </a>
            <a href="https://www.tiktok.com/" className="social-icon" aria-label="TikTok">
              <FaTiktok /> {/* TikTok icon */}
            </a>
            <a href="https://www.instagram.com/" className="social-icon" aria-label="Instagram">
              <FaInstagram /> {/* Instagram icon */}
            </a>
            <a href="https://www.facebook.com/" className="social-icon" aria-label="Facebook">
              <FaFacebook /> {/* Facebook icon */}
            </a>
          </div>
        </div>
      </div>
      <div className="admin-credits">
        {/* Credits section with a copyright notice */}
        <p>© 2024 כל הזכויות שמורות | פותח על ידי אלמוג ורפי</p>
      </div>
    </footer>
  );
}
