import React, { useState, useEffect,useContext } from "react";
import { JobsContext } from '../context/JobsContext';
import JobsComp from "./JobsComp";
import '../styles/jobsCarousel.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function JobsCarousel() {
    const { jobs } = useContext(JobsContext);
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

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage) % jobs.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - itemsPerPage + jobs.length) % jobs.length);
    };

    if (jobs.length === 0) {
        return <div className="no-jobs">אין משרות זמינות כרגע.</div>;
    }

    const getIndicatorText = () => {
        if (itemsPerPage === 1) {
            return `משרה ${currentIndex + 1} מתוך ${jobs.length}`;
        } else {
            return `משרות ${currentIndex + 1}-${Math.min(currentIndex + itemsPerPage, jobs.length)} מתוך ${jobs.length}`;
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
                    {jobs.slice(currentIndex, currentIndex + itemsPerPage).map((item, index) => (
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
                {Array.from({ length: Math.ceil(jobs.length / itemsPerPage) }).map((_, index) => (
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