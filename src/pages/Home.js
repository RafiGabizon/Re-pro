import React from "react";
import '../styles/styles.css';
import NavbarTop from '../Components/NavbarTop';
import NavbarBottom from '../Components/NavbarBottom';
import JobsComp from "../Components/JobsComp";
import Recommands from "../Components/RecoComp";
import OpenComp from "../Components/OpenComp";

export default function Home() {
  return (
    <div className="App">
      <NavbarTop />

      <OpenComp/>
      <br></br>
      <h2>
      : משרות חמות
      <br></br>
      </h2>
      <JobsComp/>
      <br></br>
      <h2>
      : הממליצים שלנו
      <br></br>
      </h2>
      <Recommands/>
      <br></br>
      <NavbarBottom />
    </div>
  );
}


