// Importing necessary dependencies and components
import React, { useState, useEffect, useContext, useCallback } from "react"; // Import React and hooks for state, lifecycle, and context management
import '../styles/recoStyles.css'; // Import CSS for styling the component
import { FaQuoteLeft, FaQuoteRight, FaArrowLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import icons from Font Awesome
import Modal from 'react-modal'; // Import Modal for displaying video recommendations
import { HomePageContext } from '../context/HomePageContext'; // Import context for accessing homepage data
import israelImg from "../images/israel_israeli_img.jpg"; // Import image for Israel
import saraImg from "../images/sara_cohen_img.jpg"; // Import image for Sara Cohen

// Set the modal's root element for accessibility
Modal.setAppElement('#root');

// Functional component for rendering employee recommendations
export default function RecoComp() {
    const [modalIsOpen, setModalIsOpen] = useState(false); // State to manage modal visibility
    const [currentVideo, setCurrentVideo] = useState(""); // State to store the current video URL
    const [currentIndex, setCurrentIndex] = useState(0); // State to manage the current recommendation index
    const { homePageData } = useContext(HomePageContext); // Access homePageData from context
    const { recommendations } = homePageData; // Extract recommendations from the context data

    // Function to open the modal and set the current video
    const openModal = (videoUrl) => {
        setCurrentVideo(videoUrl);
        setModalIsOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setModalIsOpen(false);
        setCurrentVideo("");
    };

    // Function to move to the next slide
    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => 
            prevIndex === recommendations.length - 1 ? 0 : prevIndex + 1
        );
    }, [recommendations.length]);

    // Function to move to the previous slide
    const prevSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? recommendations.length - 1 : prevIndex - 1
        );
    };

    // Automatically cycle through slides every 5 seconds
    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer); // Cleanup timer on component unmount
    }, [nextSlide]);

    return (
        <div className="reco-container">
            <h2 className="reco-title">המלצות מעובדים</h2> {/* Recommendations Title */}
            <div className="reco-carousel">
                {/* Button to navigate to the previous slide */}
                <button onClick={prevSlide} className="carousel-button prev">
                    <FaChevronLeft />
                </button>

                {/* Recommendation Card */}
                <div className="reco-card">
                    <div className="reco-image">
                        {/* Dynamically load the appropriate image based on the index */}
                        <img
                            src={currentIndex === 1 ? saraImg : israelImg}
                            alt={`תמונתו/ה של ${recommendations[currentIndex].recoName}`} 
                            className="reco-avatar"
                        />
                    </div>
                    <div className="reco-content">
                        <h3 className="reco-name">{recommendations[currentIndex].recoName}</h3> {/* Name */}
                        <p className="reco-job">{recommendations[currentIndex].jobType}</p> {/* Job Type */}
                        <div className="reco-speech">
                            <FaQuoteRight className="quote-icon right" />
                            <p className="speech-text">{recommendations[currentIndex].spich}</p> {/* Speech */}
                            <FaQuoteLeft className="quote-icon left" />
                        </div>
                        <button
                            onClick={() => openModal(recommendations[currentIndex].mainVid)} 
                            className="reco-link"
                        >
                            קרא עוד <FaArrowLeft className="arrow-icon" /> {/* "Read More" */}
                        </button>
                    </div>
                </div>

                {/* Button to navigate to the next slide */}
                <button onClick={nextSlide} className="carousel-button next">
                    <FaChevronRight />
                </button>
            </div>

            {/* Modal for displaying video recommendations */}
            <Modal 
                isOpen={modalIsOpen} 
                onRequestClose={closeModal} 
                className="Modal"
                overlayClassName="Overlay"
            >
                <button onClick={closeModal} className="close-button">X</button> {/* Close Button */}
                <div className="video-container">
                    <iframe 
                        width="560" 
                        height="315" 
                        src={currentVideo} 
                        title="Video Recommendation" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                    ></iframe>
                </div>
            </Modal>
        </div>
    );
}
