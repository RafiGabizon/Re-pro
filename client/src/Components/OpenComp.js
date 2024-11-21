// Importing necessary dependencies and components
import React, { useContext } from "react"; // Import React and useContext hook
import '../styles/openingStyle.css'; // Import CSS for styling the opening component
import { FaWhatsapp } from "react-icons/fa"; // Import WhatsApp icon from Font Awesome
import { HomePageContext } from '../context/HomePageContext'; // Import HomePageContext to access data

// Functional component for the opening section
export default function OpenComp() {
    // Destructure necessary data from the HomePageContext
    const { homePageData } = useContext(HomePageContext);
    const { mainTitle, description, videoUrl, features } = homePageData.openComp;

    // Handler for the WhatsApp button click
    const handleWhatsAppClick = () => {
        window.open('https://wa.link/oc0fb6', '_blank'); // Open WhatsApp link in a new tab
    };

    return (
        // Main section of the opening component
        <section className="opening-section">
            <div className="content-wrapper">
                {/* Text content section */}
                <div className="text-content">
                    {/* Main title */}
                    <h2 className="main-title">{mainTitle}</h2>
                    {/* List of features */}
                    <ul className="feature-list">
                        {features.map((feature, index) => (
                            <li key={index}>{feature}</li> // Render each feature as a list item
                        ))}
                    </ul>
                    {/* Description text */}
                    <p className="description">{description}</p>
                    {/* Call-to-action button */}
                    <button className="cta-button" onClick={handleWhatsAppClick}>
                        <FaWhatsapp /> צור קשר עכשיו {/* WhatsApp icon and button text */}
                    </button>
                </div>
                {/* Video container for embedding YouTube video */}
                <div className="video-container">
                    <iframe 
                        src={videoUrl} // Video URL from context
                        title="YouTube video player" // Title for accessibility
                        frameBorder="0" // No border for the iframe
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" // Permissions for the video
                        allowFullScreen // Allow fullscreen mode
                    ></iframe>
                </div>
            </div>
        </section>
    );
}
