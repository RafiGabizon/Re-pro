import React from 'react';
import '../styles/styles.css';
import NavbarTop from '../Components/NavbarTop';
import NavbarBottom from '../Components/NavbarBottom';
import JobsComp from '../Components/JobsComp';

export default function Jobs_Abroad() {
  return (
    <div>
      <NavbarTop />
      <div className="Jobs_Abroad">
        <h2>עבודות בחו"ל</h2>
      <JobsComp />
      </div>
      <NavbarBottom />
    </div>
  );
}
