// Importing necessary dependencies and components
import React, { useState, useEffect } from 'react'; // Import React and hooks for state and lifecycle management
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Import routing components from React Router
import '../styles/navbar.css'; // Import CSS styles for the navbar
import Repro from '../images/Repro_Logo.jpg'; // Import the logo image
import { FaWhatsapp } from "react-icons/fa"; // Import the WhatsApp icon from Font Awesome

// Functional component for rendering the top navigation bar
export default function NavbarTop() {
  // State variables to manage menu visibility and user login status
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Tracks if the mobile menu is open
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks if the user is logged in

  // Hooks for navigation and getting the current location
  const navigate = useNavigate(); // Allows programmatic navigation
  const location = useLocation(); // Provides access to the current location

  // Effect hook to check the user's login status when the component mounts or location changes
  useEffect(() => {
    // Function to check if a token exists in local storage
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      setIsLoggedIn(!!token); // Update isLoggedIn state based on token presence
    };
    checkLoginStatus(); // Initial check on component mount

    // Add an event listener to update login status when local storage changes
    window.addEventListener('storage', checkLoginStatus);

    // Cleanup the event listener on component unmount or when location changes
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, [location]); // Dependency array includes location to re-run effect when location changes

  // Function to toggle the mobile menu open or closed
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the isMenuOpen state
  };

  // Function to close the mobile menu
  const closeMenu = () => {
    setIsMenuOpen(false); // Set isMenuOpen to false
  };

  // Handler for the "Post Job" button click
  const handlePostJobClick = (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    closeMenu(); // Close the mobile menu
    if (isLoggedIn) {
      navigate('/postJob'); // Navigate to post job page if logged in
    } else {
      navigate('/jobPosting'); // Navigate to job posting page if not logged in
    }
  };

  // Handler for the "Profile" or "Login" button click
  const handleProfileClick = (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    closeMenu(); // Close the mobile menu
    if (isLoggedIn) {
      navigate('/profile'); // Navigate to profile page if logged in
    } else {
      navigate('/login'); // Navigate to login page if not logged in
    }
  };

  return (
    // Main navbar container
    <div className="navbar">
      <div className="nav-content">
        {/* Logo linking back to the home page */}
        <Link to="/" className="logo-link">
          <img src={Repro} className="logo" alt="דף בית" title="Re_Pro" /> {/* Logo image */}
        </Link>
        
        {/* Hamburger menu icon for mobile view */}
        <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navigation links */}
        <nav className={`links ${isMenuOpen ? 'open' : ''}`}>
          <div className="nav-group">
            {/* Navigation links to different sections */}
            <Link to="/JobsAbroad" className="nav-link" onClick={closeMenu}>
              עבודות בחו"ל {/* "Jobs Abroad" in Hebrew */}
            </Link>
            <Link to="/Articles" className="nav-link" onClick={closeMenu}>
              כתבות {/* "Articles" */}
            </Link>
            <Link to="/QustionAsk" className="nav-link" onClick={closeMenu}>
              שאלות ותשובות {/* "Questions and Answers" */}
            </Link>
            <Link to="/About" className="nav-link" onClick={closeMenu}>
              אודות {/* "About" */}
            </Link>
          </div>
          
          {/* WhatsApp contact link */}
          <Link to="https://wa.link/oc0fb6" className="whatsapp-link">
            <FaWhatsapp /> {/* WhatsApp icon */}
          </Link>

          {/* Action buttons for posting a job or accessing personal area */}
          <div className="action-buttons">
            {/* "Post Job" button */}
            <Link to='JobPosting' className="action-button" onClick={handlePostJobClick}>
              פרסום משרה {/* "Post Job" */}
            </Link>
            {/* "Personal Area" or "Login" button depending on login status */}
            <Link 
              to={isLoggedIn ? '/profile' : '/login'} 
              className="action-button" 
              onClick={handleProfileClick}
            >
              {isLoggedIn ? 'אזור אישי' : 'התחברות'} {/* "Personal Area" or "Login" */}
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
