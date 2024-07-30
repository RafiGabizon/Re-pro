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
    "גרמניה": "DE"
};

// פונקציה להמרת שם המדינה לקוד מדינה
const getCountryCode = (countryName) => {
    return countryCodeMap[countryName] || "UN"; // UN כברירת מחדל אם לא נמצא קוד
};

export default function JobsComp({ item }) {
    if (!item) {
        return null;
    }
    console.log('item:', item);

    return (
        <div className="job-item">
            <div className="img-container">
                <div className="text-content">
                    <img src={item.mainImg} alt="" className="main-img" />
                </div>
                <div className="text-wrapper">
                    <ReactCountryFlag 
                        className="country-flag"
                        countryCode={getCountryCode(item.State)}
                        svg
                        style={{
                            width: '30px',
                            height: '23px',
                            marginBottom: 0.2
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