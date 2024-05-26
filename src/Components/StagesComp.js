import React, { useState } from "react";
import "../styles/stagesStyles.css";
import myImage from "../images/stages.png";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: "800px",
    borderRadius: "5px",
  },
};

export default function Stages() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="stages">
      <img src={myImage} alt="תיאור התמונה" />

      <div className="button-container">
        <br></br><br></br>
        <button onClick={handleOpenModal}>
          <span>? איך זה עובד</span>
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        style={customStyles}
      >
        <iframe 
          width="500" 
          height="180" 
          src="https://www.youtube.com/embed/pqMCdKH9oBQ?si=7hzvW1RJrvauRwOk" 
          title="How it`s done ?" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerpolicy="no-referrer" 
          allowfullscreen
        >
        </iframe>
      </Modal>
    </div>
  );
}
