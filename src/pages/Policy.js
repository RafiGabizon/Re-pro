import React from 'react';
import '../styles/styles.css';
import NavbarTop from '../Components/NavbarTop';
import NavbarBottom from '../Components/NavbarBottom';

export default function Policy() {
  return (
    <div>
      <NavbarTop />
      <div className="Policy">
        <h2>מדיניות ופרטיות</h2>
      </div>
      <NavbarBottom />
    </div>
  );
}
