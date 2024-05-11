import React from 'react';
import '../styles/styles.css';
import NavbarTop from '../Components/NavbarTop';
import NavbarBottom from '../Components/NavbarBottom';

export default function LogIn() {
  return (
    <div>
      <NavbarTop />
      <div className="LogIn">
        <h2>איזור אישי</h2>
      </div>
      <NavbarBottom />
    </div>
  );
}
