import React, { useState, useEffect, useContext, useCallback } from "react";import '../styles/recoStyles.css';
import { FaQuoteLeft, FaQuoteRight, FaArrowLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Modal from 'react-modal';
import { HomePageContext } from '../context/HomePageContext';

Modal.setAppElement('#root');

export default function RecoComp() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentVideo, setCurrentVideo] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const { homePageData } = useContext(HomePageContext);
    const { recommendations } = homePageData;

    const openModal = (videoUrl) => {
        setCurrentVideo(videoUrl);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setCurrentVideo("");
    };

    const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
        prevIndex === recommendations.length - 1 ? 0 : prevIndex + 1
    );
}, [recommendations.length]);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? recommendations.length - 1 : prevIndex - 1
        );
    };

   useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
}, [nextSlide]);

    return (
        <div className="reco-container">
            <h2 className="reco-title">המלצות מעובדים</h2>
            <div className="reco-carousel">
                <button onClick={prevSlide} className="carousel-button prev">
                    <FaChevronLeft />
                </button>
                <div className="reco-card">
                    <div className="reco-image">
                        <img src={recommendations[currentIndex].mainVid} alt={recommendations[currentIndex].recoName} className="reco-avatar" />
                    </div>
                    <div className="reco-content">
                        <h3 className="reco-name">{recommendations[currentIndex].recoName}</h3>
                        <p className="reco-job">{recommendations[currentIndex].jobType}</p>
                        <div className="reco-speech">
                            <FaQuoteRight className="quote-icon right" />
                            <p className="speech-text">{recommendations[currentIndex].spich}</p>
                            <FaQuoteLeft className="quote-icon left" />
                        </div>
                        <button onClick={() => openModal(recommendations[currentIndex].mainVid)} className="reco-link">
                            קרא עוד <FaArrowLeft className="arrow-icon" />
                        </button>
                    </div>
                </div>
                <button onClick={nextSlide} className="carousel-button next">
                    <FaChevronRight />
                </button>
            </div>
            <Modal 
                isOpen={modalIsOpen} 
                onRequestClose={closeModal} 
                className="Modal"
                overlayClassName="Overlay"
            >
                <button onClick={closeModal} className="close-button">X</button>
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