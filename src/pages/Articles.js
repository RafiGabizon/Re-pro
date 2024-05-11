import React from 'react';
import '../styles/styles.css';
import NavbarTop from '../Components/NavbarTop';
import NavbarBottom from '../Components/NavbarBottom';

export default function Articles() {
  return (
    <div>
      <NavbarTop />
      <div className="Articles">
        <h2>כתבות</h2>
      </div>
      <NavbarBottom />
    </div>
  )
}
