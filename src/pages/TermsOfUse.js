import React from 'react';
import '../styles/styles.css';
import NavbarTop from '../Components/NavbarTop';
import NavbarBottom from '../Components/NavbarBottom';

export default function TermsOfUse() {
  return (
    <div>
      <NavbarTop />
      <div className="TermsOfUse">
        <h2>תנאי שימוש</h2>
      </div>
      <NavbarBottom />
    </div>
  );
}
