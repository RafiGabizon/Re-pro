import React from "react";
import { Link } from 'react-router-dom';
import '../styles/JobsComp.css';
import { PiAirplaneTakeoff } from "react-icons/pi";
import ReactCountryFlag from "react-country-flag";


// מיפוי שמות המדינות לקודי מדינות
const countryCodeMap = {
    "הודו": "IN",
    "ארצות הברית": "US",
    "ישראל": "IL",
    "אוסטרליה": "AU",
    "גרמניה": "DE",
    "צרפת": "FR",
    "בריטניה": "GB",
    "יפן": "JP",
    "קנדה": "CA"
    
};

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

// פונקציה להמרת שם המדינה לקוד מדינה
const getCountryCode = (countryName) => {
    return countryCodeMap[countryName] || "UN"; // UN כברירת מחדל אם לא נמצא קוד
};

const getCountryImg = (countryName) => {
    return countryImg[countryName] || "https://via.placeholder.com/150";
}

export default function JobsComp({ item }) {
    if (!item) {
        return null;
    }
    console.log('item:', item);

    return (
        <div className="job-item">
            <div className="img-container">
                <div className="text-content">
                    <img className="main-img" src= {getCountryImg(item.State)} alt="country" />
                    
                </div>
                <div className="text-wrapper">
                    <ReactCountryFlag 
                        className="country-flag"
                        countryCode={getCountryCode(item.State)}
                        svg
                        style={{
                        width: '30px',
                        height: '23px',
                        marginBottom: 0.2,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        display: 'inline-block',
                        overflow: 'hidden',
                        boxShadow: 'inset 0 0 8px rgba(255,255,255,0.6), 0 0 2px rgba(0,0,0,0.3)'
                        }}
                        title={item.State}
                    />
                    <div className="text-content">
                        <Link to={`/job/${item.id}`} className="button-link"><PiAirplaneTakeoff /></Link>
                        <p>{item.Continents}, {item.State}</p>
                        <p>{item.Domains}</p>
                        <p>{item.JobType}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}