import React from 'react';
import '../styles/styles.css';
import NavbarTop from '../Components/NavbarTop';
import NavbarBottom from '../Components/NavbarBottom';

export default function About() {
  return (
    <div>
      <NavbarTop />
      <div className="About">
        <h2>אודות</h2>
      </div>
      <NavbarBottom />
    </div>
  )
}
