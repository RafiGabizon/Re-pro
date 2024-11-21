// Importing necessary dependencies and components
import React from "react"; // Import React to enable JSX syntax
import { Link } from 'react-router-dom'; // Import Link component for navigation
import '../styles/JobsComp.css'; // Import CSS file for styling the job component
import { PiAirplaneTakeoff } from "react-icons/pi"; // Import icon for the job link
import ReactCountryFlag from "react-country-flag"; // Import React Country Flag component for displaying country flags

// Mapping of country names to country codes
const countryCodeMap = {
    "הודו": "IN", // India
    "ארצות הברית": "US", // United States
    "ישראל": "IL", // Israel
    "אוסטרליה": "AU", // Australia
    "גרמניה": "DE", // Germany
    "צרפת": "FR", // France
    "בריטניה": "GB", // United Kingdom
    "יפן": "JP", // Japan
    "קנדה": "CA" // Canada
};

// Mapping of country names to country images
const countryImg = {
    "הודו": "https://i0.wp.com/eos.org/wp-content/uploads/2022/10/mumbai-skyline.jpg?fit=1200%2C675&ssl=1",
    "ארצות הברית": "https://www.imagesfromtexas.com/images/xl/Aerial-View-of-Downtown-Austin-in-January-1.jpg",
    "ישראל": "https://media.timeout.com/images/105434111/1024/576/image.webp",
    "גרמניה": "https://www.shutterstock.com/image-photo/german-village-alsfeld-above-260nw-1474612880.jpg",
    "צרפת": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoLflGr20hAoax_INCgYF_xh4YKnLE4GfCdA&s",
    "בריטניה": "https://media.timeout.com/images/105434111/1024/576/image.webp",
    "יפן": "https://media.timeout.com/images/105434111/1024/576/image.webp",
    "קנדה": "https://media.timeout.com/images/105434111/1024/576/image.webp",
    "אוסטרליה": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3iDdyaEyo9cN2tOlL9wwSoUeKzaK1goEb8w&s"
};

// Function to get the country code for a given country name
const getCountryCode = (countryName) => {
    return countryCodeMap[countryName] || "UN"; // Default to "UN" if no code is found
};

// Function to get the country image for a given country name
const getCountryImg = (countryName) => {
    return countryImg[countryName] || "https://via.placeholder.com/150"; // Default to placeholder image if no image is found
};

// Functional component for rendering individual job details
export default function JobsComp({ item }) {
    if (!item) {
        return null; // Do not render if no job item is provided
    }
    console.log('item:', item); // Log job details for debugging

    return (
        <div className="job-item">
            {/* Image container for the job */}
            <div className="img-container">
                <div className="text-content">
                    {/* Display the country image */}
                    <img className="main-img" src={getCountryImg(item.State)} alt="country" />
                </div>
                <div className="text-wrapper">
                    {/* Display the country flag */}
                    <ReactCountryFlag 
                        className="country-flag"
                        countryCode={getCountryCode(item.State)} // Get country code
                        svg // Use SVG format for flag
                        style={{
                            width: '30px', // Set flag width
                            height: '23px', // Set flag height
                            marginBottom: 0.2, // Add spacing below the flag
                            borderRadius: '50%', // Make flag circular
                            objectFit: 'cover', // Maintain aspect ratio
                            display: 'inline-block', // Display inline
                            overflow: 'hidden', // Hide overflow
                            boxShadow: 'inset 0 0 8px rgba(255,255,255,0.6), 0 0 2px rgba(0,0,0,0.3)' // Add shadow
                        }}
                        title={item.State} // Tooltip showing the state name
                    />
                    {/* Text content for the job */}
                    <div className="text-content">
                        {/* Link to the job details page */}
                        <Link to={`/job/${item.id}`} className="button-link"><PiAirplaneTakeoff /></Link>
                        {/* Display job details */}
                        <p>{item.Continents}, {item.State}</p> {/* Continent and state */}
                        <p>{item.Domains}</p> {/* Job domain */}
                        <p>{item.JobType}</p> {/* Job type */}
                    </div>
                </div>
            </div>
        </div>
    );
}
