import React, { useState, useEffect } from "react";
import { reco_ar } from "../data/recommands";
import '../styles/recoStyles.css';
import { FaQuoteLeft, FaQuoteRight, FaArrowLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function RecoComp() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentVideo, setCurrentVideo] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    const openModal = (videoUrl) => {
        setCurrentVideo(videoUrl);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setCurrentVideo("");
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === reco_ar.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? reco_ar.length - 1 : prevIndex - 1
        );
    };

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="reco-container">
            <h2 className="reco-title">המלצות מעובדים</h2>
            <div className="reco-carousel">
                <button onClick={prevSlide} className="carousel-button prev">
                    <FaChevronLeft />
                </button>
                <div className="reco-card">
                    <div className="reco-image">
                        <img src={reco_ar[currentIndex].mainVid} alt={reco_ar[currentIndex].recoName} className="reco-avatar" />
                    </div>
                    <div className="reco-content">
                        <h3 className="reco-name">{reco_ar[currentIndex].recoName}</h3>
                        <p className="reco-job">{reco_ar[currentIndex].jobType}</p>
                        <div className="reco-speech">
                            <FaQuoteRight className="quote-icon right" />
                            <p className="speech-text">{reco_ar[currentIndex].spich}</p>
                            <FaQuoteLeft className="quote-icon left" />
                        </div>
                        <button onClick={() => openModal(reco_ar[currentIndex].mainVid)} className="reco-link">
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