import React, { useState, useEffect } from "react";
import { jobs_ar } from "../data/jobs";
import JobsComp from "./JobsComp";
import '../styles/jobsCarousel.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function JobsCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 8500);

        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.max(jobs_ar.length - 1, 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + jobs_ar.length) % Math.max(jobs_ar.length - 1, 1));
    };

    if (jobs_ar.length === 0) {
        return <div className="no-jobs">אין משרות זמינות כרגע.</div>;
    }
    
    return (
        <div className="carousel-container">
            <div className="carousel-header">
                <h2>משרות חמות</h2>
                <div className="carousel-indicator">
                    משרות {currentIndex + 1}-{Math.min(currentIndex + 2, jobs_ar.length)} מתוך {jobs_ar.length}
                </div>
            </div>
            <div className="carousel-content">
                <div className="carousel-items-wrapper">
                    {jobs_ar.slice(currentIndex, currentIndex + 2).map((item, index) => (
                            <div key={currentIndex + index} className="carousel-item active">
                                <JobsComp item={item} />
                            </div>
                    ))}
                    {currentIndex + 1 >= jobs_ar.length && (
                        <div key="first" className="carousel-item">
                            <JobsComp item={jobs_ar[0]} />
                        </div>
                    )}
                </div>
            </div>
            <button className="carousel-button next" onClick={prevSlide}>
                <FaChevronRight />
            </button>
            <button className="carousel-button prev" onClick={nextSlide}>
                <FaChevronLeft />
            </button>
            <div className="carousel-dots">
                {jobs_ar.map((_, index) => (
                    <span 
                        key={index} 
                        className={`dot ${index * 2 === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index * 2)}
                    ></span>
                ))}
            </div>
        </div>
    );
}