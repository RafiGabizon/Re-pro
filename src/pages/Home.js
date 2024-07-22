import React from "react";
import { jobs_ar } from "../data/jobs";
import '../styles/styles.css';
import JobsComp from "../Components/JobsComp";
import OpenComp from "../Components/OpenComp";
import Reco_comp from "../Components/RecoComp";
import Stages from "../Components/StagesComp";
import '../styles/styles.css';

export default function Home() {
  return (
    <div className="App">
      
      <OpenComp/>
      <br></br>
      <JobsComp/>
      <br></br><br></br>
      <Stages/>
      <br></br><br></br><br></br>
      <Reco_comp/>

    </div>
  )
}


