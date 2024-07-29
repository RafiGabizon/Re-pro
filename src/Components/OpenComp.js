import React from "react";
import '../styles/openingStyle.css';
import { FaWhatsapp } from "react-icons/fa";


export default function OpenComp() {

    const handleWhatsAppClick = () => {
        window.open('https://wa.link/oc0fb6', '_blank');
    };

    return (
        <section className="opening-section">
            <div className="content-wrapper">
                <div className="text-content">
                    <h2 className="main-title">הזדמנות שלך לקריירה גלובלית</h2>
                    <ul className="feature-list">
                        <li>מגוון משרות ברחבי העולם</li>
                        <li>התאמה אישית לכישורים וניסיון</li>
                        <li>חוויה תרבותית ייחודית</li>
                        <li>תמיכה מקצועית לאורך כל הדרך</li>
                    </ul>
                    <p className="description">
                        אנו מציעים לכם הזדמנות ייחודית לקחת את הקריירה שלכם צעד קדימה ולהתחיל לעבוד בחו"ל. עם מגוון רחב של משרות בתחומים שונים, נעזור לכם למצוא את ההזדמנות המושלמת עבורכם.
                    </p>
                     <button className="cta-button" onClick={handleWhatsAppClick}> <FaWhatsapp />  צור קשר עכשיו</button>
                </div>
                <div className="video-container">
                    <iframe 
                        src="https://www.youtube.com/embed/N1QtAXj9y48?si=7F_4SPD5-_aw1uyg" 
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