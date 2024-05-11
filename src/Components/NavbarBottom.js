import React from 'react';
import { Link } from 'react-router-dom';

export default function NavbarBottom() {
  return (
    <div className="bottom_bar" aria-label="Footer navigation">
      <div className="bottom_bar_links">
        <p className="bottom_bar_text">
          תודה שבחרתם ריפרו! אנחנו זמינים בשבילכם כל העת לשאלות, ייעוץ, הכוונה ובקשות נוספות.
        </p>
        <div className="link_group">
          <Link to="/About" className="link_item">אודות</Link>
          <Link to="/Contact" className="link_item">צור קשר</Link>
          <Link to="/TermsOfUse" className="link_item">תנאי שימוש</Link>
          <Link to="/Policy" className="link_item">מדיניות פרטיות</Link>
        </div>
        <div className="link_group">
          <Link to="/Employers" className="link_item">מעסיקים</Link>
          <Link to="/Jobs_Abroad" className="link_item">עבודות בחו"ל</Link>
          <Link to="/Articles" className="link_item">כתבות</Link>
          <Link to="/Qustion_Ask" className="link_item">שאלות ותשובות</Link>
          <Link to="/LogIn" className="link_item">איזור אישי</Link>
        </div>
      </div>
    </div>
  );
}
