import React from 'react';
import '../styles/styles.css';
import NavbarTop from '../Components/NavbarTop';
import NavbarBottom from '../Components/NavbarBottom';

export default function Qustion_Ask() {
  return (
    <div>
      <NavbarTop />
      <div className="Qustion_Ask">
        <h2>שאלות תשובות</h2>
      </div>
      <NavbarBottom />
    </div>
  );
}
