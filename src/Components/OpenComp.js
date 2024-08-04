import React, { useContext } from "react";
import '../styles/openingStyle.css';
import { FaWhatsapp } from "react-icons/fa";
import { HomePageContext } from '../context/HomePageContext';

export default function OpenComp() {
    const { homePageData } = useContext(HomePageContext);
    const { mainTitle, description, videoUrl, features } = homePageData.openComp;

    const handleWhatsAppClick = () => {
        window.open('https://wa.link/oc0fb6', '_blank');
    };

    return (
        <section className="opening-section">
            <div className="content-wrapper">
                <div className="text-content">
                    <h2 className="main-title">{mainTitle}</h2>
                    <ul className="feature-list">
                        {features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>
                    <p className="description">{description}</p>
                    <button className="cta-button" onClick={handleWhatsAppClick}> <FaWhatsapp />  צור קשר עכשיו</button>
                </div>
                <div className="video-container">
                    <iframe 
                        src={videoUrl}
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </section>
    )
}