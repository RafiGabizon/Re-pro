// Importing necessary dependencies and components
import React, { useState, useEffect, useContext } from "react"; // Import React and hooks for managing state and side effects
import { JobsContext } from '../context/JobsContext'; // Import JobsContext to access job data
import JobsComp from "./JobsComp"; // Import the JobsComp component for displaying individual job details
import '../styles/jobsCarousel.css'; // Import CSS for styling the carousel
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Import Font Awesome icons for navigation buttons

// Functional component for rendering a carousel of hot jobs
export default function JobsCarousel() {
    const { jobs } = useContext(JobsContext); // Access job data from context
    const [currentIndex, setCurrentIndex] = useState(0); // State for the current index of the carousel
    const [itemsPerPage, setItemsPerPage] = useState(2); // State for the number of items to display per page
    const [hotJobs, setHotJobs] = useState([]); // State for filtering hot jobs

    // Effect to filter jobs marked as "hot" whenever the jobs array changes
    useEffect(() => {
        setHotJobs(jobs.filter(job => job.isHot === true));
    }, [jobs]);

    // Effect to handle responsiveness and dynamically set the number of items per page based on screen size
    useEffect(() => {
        const handleResize = () => {
            setItemsPerPage(window.innerWidth <= 768 ? 1 : 2); // Show 1 item per page on small screens, 2 on larger screens
        };

        window.addEventListener("resize", handleResize); // Add event listener for window resize
        handleResize(); // Initialize items per page on component mount

        return () => window.removeEventListener("resize", handleResize); // Cleanup event listener on component unmount
    }, []);

    // Function to navigate to the next set of jobs in the carousel
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage) % Math.max(hotJobs.length, 1));
    };

    // Function to navigate to the previous set of jobs in the carousel
    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - itemsPerPage + Math.max(hotJobs.length, 1)) % Math.max(hotJobs.length, 1));
    };

    // Function to generate text for the indicator showing the current job(s) being displayed
    const getIndicatorText = () => {
        if (hotJobs.length === 0) return "אין משרות חמות זמינות"; // Message when no hot jobs are available
        if (itemsPerPage === 1) {
            return `משרה ${currentIndex + 1} מתוך ${hotJobs.length}`; // Single job display indicator
        }
        return `משרות ${currentIndex + 1}-${Math.min(currentIndex + itemsPerPage, hotJobs.length)} מתוך ${hotJobs.length}`; // Range of jobs display indicator
    };

    return (
        <div className="carousel-container">
            {/* Header section with title and indicator */}
            <div className="carousel-header">
                <h2>משרות חמות</h2>
                <div className="carousel-indicator">
                    {getIndicatorText()}
                </div>
            </div>
            {/* Content section displaying the jobs */}
            <div className="carousel-content">
                <div className="carousel-items-wrapper">
                    {hotJobs.length > 0 ? (
                        hotJobs.slice(currentIndex, currentIndex + itemsPerPage).map((item, index) => (
                            <div key={currentIndex + index} className="carousel-item active">
                                <JobsComp item={item} /> {/* Render individual job using JobsComp */}
                            </div>
                        ))
                    ) : (
                        <div className="carousel-item active no-jobs-message">
                            {/* Message when no hot jobs are available */}
                            <p>אין כרגע משרות חמות זמינות.</p>
                            <p>אנא בדוק שוב מאוחר יותר.</p>
                        </div>
                    )}
                </div>
            </div>
            {/* Navigation buttons */}
            <button className="carousel-button prev" onClick={nextSlide} disabled={hotJobs.length === 0}>
                <FaArrowLeft /> {/* Left arrow icon */}
            </button>
            <button className="carousel-button next" onClick={prevSlide} disabled={hotJobs.length === 0}>
                <FaArrowRight /> {/* Right arrow icon */}
            </button>
            {/* Dots for navigating directly to specific job sets */}
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
