import React from "react";
import '../styles/styles.css';
import JobsComp from "../Components/JobsComp";
import OpenComp from "../Components/OpenComp";
import Recommands from "../Components/RecoComp";
import Stages from "../Components/StagesComp";

export default function Home({ toggleContactModal }) {
  return (
    <div className="App">
      <OpenComp/>
      <br />
      <JobsComp/>
      <br /><br />
      <Stages/>
      <br /><br /><br />
      <Recommands/>
      <button 
        className="consultant-button" 
        onClick={toggleContactModal}
        aria-label="Contact career advisor"
      >
        פנייה ליועץ תעסוקתי
      </button>
    </div>
  )
}
