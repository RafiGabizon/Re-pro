import React, { useState, useEffect } from "react";
import { jobs_ar } from "../data/jobs";
import JobsComp from "./JobsComp";
import '../styles/jobsCarousel.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function JobsCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(2);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setItemsPerPage(1);
            } else {
                setItemsPerPage(2);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        const interval = setInterval(() => {
            // nextSlide();
        }, 8500);

        return () => {
            window.removeEventListener("resize", handleResize);
            clearInterval(interval);
        };
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage) % jobs_ar.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - itemsPerPage + jobs_ar.length) % jobs_ar.length);
    };

    if (jobs_ar.length === 0) {
        return <div className="no-jobs">אין משרות זמינות כרגע.</div>;
    }

    const getIndicatorText = () => {
        if (itemsPerPage === 1) {
            return `משרה ${currentIndex + 1} מתוך ${jobs_ar.length}`;
        } else {
            return `משרות ${currentIndex + 1}-${Math.min(currentIndex + itemsPerPage, jobs_ar.length)} מתוך ${jobs_ar.length}`;
        }
    };

    return (
        <div className="carousel-container">
            <div className="carousel-header">
                <h2>משרות חמות</h2>
                <div className="carousel-indicator">
                    {getIndicatorText()}
                </div>
            </div>
            <div className="carousel-content">
                <div className="carousel-items-wrapper">
                    {jobs_ar.slice(currentIndex, currentIndex + itemsPerPage).map((item, index) => (
                        <div key={currentIndex + index} className="carousel-item active">
                            <JobsComp item={item} />
                        </div>
                    ))}
                </div>
            </div>
            <button className="carousel-button prev" onClick={nextSlide}>
                <FaArrowLeft />
            </button>
            <button className="carousel-button next" onClick={prevSlide}>
                <FaArrowRight />
            </button>
            <div className="carousel-dots">
                {Array.from({ length: Math.ceil(jobs_ar.length / itemsPerPage) }).map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index * itemsPerPage === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index * itemsPerPage)}
                    ></span>
                ))}
            </div>
        </div>
    );
}