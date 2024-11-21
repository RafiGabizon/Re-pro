// Importing necessary dependencies
import React from "react"; // Import React library
import '../styles/home.css'; // Import CSS for styling
import OpenComp from "../Components/OpenComp"; // Component for the opening section
import RecoComp from "../Components/RecoComp"; // Component for recommendations
import Stages from "../Components/StagesComp"; // Component for process stages
import QuestionFrame from '../Components/QuestionFrame'; // Component for FAQ
import JobsCarousel from "../Components/JobsCarrousel"; // Component for job carousel
import { questionsAndAnswers } from '../data/q&a'; // Import data for FAQ

// Functional component for the Home page
export default function Home() {
  return (
    <div className="App">
      {/* Opening component */}
      <OpenComp />
      <br></br>
      
      {/* Jobs carousel displaying a maximum of 5 jobs */}
      <JobsCarousel maxJobs={5} />
      <br></br><br></br>
      
      {/* Stages component */}
      <Stages />
      <br></br><br></br><br></br>
      
      {/* FAQ section */}
      <div className="questions-section">
        {questionsAndAnswers.map((qa, index) => (
          <QuestionFrame 
            key={index} 
            question={qa.question} 
            answer={qa.answer} 
          /> // Display each question and answer
        ))}
      </div>
      
      {/* Recommendations component */}
      <RecoComp />
    </div>
  );
}
