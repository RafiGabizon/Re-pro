import React, { useState, useEffect, useContext } from "react";
import { JobsContext } from '../context/JobsContext';
import JobsComp from "./JobsComp";
import '../styles/jobsCarousel.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function JobsCarousel() {
    const { jobs } = useContext(JobsContext);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(2);
    const [hotJobs, setHotJobs] = useState([]);

    useEffect(() => {
        setHotJobs(jobs.filter(job => job.isHot === true));
    }, [jobs]);

    useEffect(() => {
        const handleResize = () => {
            setItemsPerPage(window.innerWidth <= 768 ? 1 : 2);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage) % Math.max(hotJobs.length, 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - itemsPerPage + Math.max(hotJobs.length, 1)) % Math.max(hotJobs.length, 1));
    };

    const getIndicatorText = () => {
        if (hotJobs.length === 0) return "אין משרות חמות זמינות";
        if (itemsPerPage === 1) {
            return `משרה ${currentIndex + 1} מתוך ${hotJobs.length}`;
        }
        return `משרות ${currentIndex + 1}-${Math.min(currentIndex + itemsPerPage, hotJobs.length)} מתוך ${hotJobs.length}`;
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
                    {hotJobs.length > 0 ? (
                        hotJobs.slice(currentIndex, currentIndex + itemsPerPage).map((item, index) => (
                            <div key={currentIndex + index} className="carousel-item active">
                                <JobsComp item={item} />
                            </div>
                        ))
                    ) : (
                        <div className="carousel-item active no-jobs-message">
                            <p>אין כרגע משרות חמות זמינות.</p>
                            <p>אנא בדוק שוב מאוחר יותר.</p>
                        </div>
                    )}
                </div>
            </div>
            <button className="carousel-button prev" onClick={nextSlide} disabled={hotJobs.length === 0}>
                <FaArrowLeft />
            </button>
            <button className="carousel-button next" onClick={prevSlide} disabled={hotJobs.length === 0}>
                <FaArrowRight />
            </button>
            <div className="carousel-dots">
                {Array.from({ length: Math.max(Math.ceil(hotJobs.length / itemsPerPage), 1) }).map((_, index) => (
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