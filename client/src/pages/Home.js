import React from "react";
import '../styles/home.css';
import OpenComp from "../Components/OpenComp";
import RecoComp from "../Components/RecoComp";
import Stages from "../Components/StagesComp";
import QuestionFrame from '../Components/QuestionFrame';
import JobsCarousel from "../Components/JobsCarrousel";
import { questionsAndAnswers } from '../data/q&a';


export default function Home() {
  return (
    <div className="App">
      
      <OpenComp/>
      <br></br>
      <JobsCarousel maxJobs={5} />
      <br></br><br></br>
      <Stages/>
      <br></br><br></br><br></br>
      <div className="questions-section">
        {questionsAndAnswers.map((qa, index) => (
          <QuestionFrame key={index} question={qa.question} answer={qa.answer} />
        ))}
      </div>
      <RecoComp/>

    </div>
  )
}


