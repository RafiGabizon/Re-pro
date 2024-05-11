import React from 'react';
import '../styles/styles.css';
import NavbarTop from '../Components/NavbarTop';
import NavbarBottom from '../Components/NavbarBottom';

export default function Contact() {
  return (
    <div>
      <NavbarTop />
      <div className="Contact">
        <h2>צור קשר</h2>
      </div>
      <NavbarBottom />
    </div>
  );
}
