import React from 'react';
import '../styles/styles.css';
import NavbarTop from '../Components/NavbarTop';
import NavbarBottom from '../Components/NavbarBottom';

export default function Employers() {
  return (
    <div>
      <NavbarTop />
      <div className="Employers">
        <h2>מעסיקים</h2>
      </div>
      <NavbarBottom />
    </div>
  );
}
