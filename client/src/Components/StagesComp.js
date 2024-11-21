// Importing necessary dependencies and components
import React, { useState, useContext } from "react"; // Import React and hooks for managing state and context
import "../styles/stagesStyles.css"; // Import CSS for styling the stages component
import Modal from "react-modal"; // Import Modal for displaying the "How it works" video
import { IoMdCloseCircleOutline } from "react-icons/io"; // Import close icon
import { HomePageContext } from '../context/HomePageContext'; // Import context for accessing homepage data

// Custom styles for the modal
const customStyles = {
  content: {
    top: "50%", // Center the modal vertically
    left: "50%", // Center the modal horizontally
    right: "auto",
    bottom: "auto",
    marginRight: "-50%", // Adjust for centering
    transform: "translate(-50%, -50%)", // Translate to center
    width: "90%", // Set width as a percentage of viewport
    maxWidth: "800px", // Maximum width for the modal
    borderRadius: "15px", // Rounded corners for the modal
    padding: "20px", // Padding inside the modal
  },
};

// Functional component for rendering the "Stages" section
export default function Stages() {
  const [modalIsOpen, setModalIsOpen] = useState(false); // State to manage modal visibility
  const { homePageData } = useContext(HomePageContext); // Access homePageData from context
  const { stages } = homePageData; // Extract stages data from the context

  // Open the modal
  const handleOpenModal = () => setModalIsOpen(true);

  // Close the modal
  const handleCloseModal = () => setModalIsOpen(false);

  return (
    <div className="stages-container">
      <h2>תהליך ההשמה לעבודות בחו"ל</h2> {/* Section title */}
      <div className="stages">
        {/* Map over stages to render each stage */}
        {stages.map((stage, index) => (
          <div key={index} className="stage">
            <div className="stage-number">{index + 1}</div> {/* Stage number */}
            <h3>{stage.title}</h3> {/* Stage title */}
            <p>{stage.description}</p> {/* Stage description */}
          </div>
        ))}
      </div>
      {/* Button to open the modal */}
      <button className="info-button" onClick={handleOpenModal}>
        איך זה עובד? {/* "How it works?" */}
      </button>
      {/* Modal displaying the explanatory video */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal} // Allow closing the modal by clicking outside or pressing ESC
        style={customStyles}
        contentLabel="How it works"
      >
        <h2>איך זה עובד?</h2> {/* Modal title */}
        <iframe 
          width="100%" 
          height="315" 
          src={homePageData.stages.modalVideoUrl} // Video URL from context
          title="How it's done?" 
          frameBorder="0" // Remove iframe border
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" // Allow permissions for embedded video
          allowFullScreen // Allow fullscreen mode
        ></iframe>
        {/* Close button */}
        <button className="close-button" onClick={handleCloseModal}>
          <IoMdCloseCircleOutline /> {/* Close icon */}
        </button>
      </Modal>
    </div>
  );
}
