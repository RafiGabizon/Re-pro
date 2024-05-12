import React from "react";
import { jobs_ar } from "../data/jobs";
import '../styles/styles.css';
import NavbarTop from '../Components/NavbarTop';
import NavbarBottom from '../Components/NavbarBottom';
import JobsComp from "../Components/JobsComp";

export default function Home() {
  return (
    <div className="App">
      <NavbarTop />
      <JobsComp/>
      <NavbarBottom />
    </div>
  );
}


