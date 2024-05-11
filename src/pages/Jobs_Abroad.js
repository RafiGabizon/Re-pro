import React from 'react';
import '../styles/styles.css';
import NavbarTop from '../Components/NavbarTop';
import NavbarBottom from '../Components/NavbarBottom';

export default function Jobs_Abroad() {
  return (
    <div>
      <NavbarTop />
      <div className="Jobs_Abroad">
        <h2>עבודות בחו"ל</h2>
      </div>
      <NavbarBottom />
    </div>
  );
}
