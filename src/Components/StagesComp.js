import React, { useState } from "react";
import "../styles/stagesStyles.css";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "800px",
    borderRadius: "15px",
    padding: "20px",
  },
};

const stages = [
  { title: "הרשמה", description: "מילוי טופס הרשמה מקוון" },
  { title: "ראיון", description: "ראיון אישי עם נציג החברה" },
  { title: "התאמה", description: "התאמת משרה מתאימה לכישורים שלך" },
  { title: "הכנה", description: "הכנה לקראת היציאה לחו\"ל" },
  { title: "יציאה", description: "יציאה לעבודה בחו\"ל" },
];

export default function Stages() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = () => setModalIsOpen(true);
  const handleCloseModal = () => setModalIsOpen(false);

  return (
    <div className="stages-container">
      <h2>תהליך ההשמה לעבודות בחו"ל</h2>
      <div className="stages">
        {stages.map((stage, index) => (
          <div key={index} className="stage">
            <div className="stage-number">{index + 1}</div>
            <h3>{stage.title}</h3>
            <p>{stage.description}</p>
          </div>
        ))}
      </div>
      <button className="info-button" onClick={handleOpenModal}>
        איך זה עובד?
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        style={customStyles}
        contentLabel="How it works"
      >
        <h2>איך זה עובד?</h2>
        <iframe 
          width="100%" 
          height="315" 
          src="https://www.youtube.com/embed/pqMCdKH9oBQ?si=7hzvW1RJrvauRwOk" 
          title="How it's done?" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen
        ></iframe>
        <button className="close-button" onClick={handleCloseModal}>סגור</button>
      </Modal>
    </div>
  );
}