import React from "react";
import { Link } from 'react-router-dom';
import '../styles/JobsComp.css';

export default function JobsComp({ item }) {
    if (!item) {
        return null; // או הצג הודעת שגיאה
    }
    console.log('item:', item);
    return (
        
        <div className="job-item">
            <div className="img-container">
                <div className="text-content">
                    <img src={item.mainImg} alt="" className="main-img" />
                </div>
                <div className="text-wrapper">
                    <img src={item.countryFlag} alt="" width={20} style={{marginBottom: 10}} />
                    <div className="text-content">
                        <Link to={`/job/${item.id}`} className="button-link">→</Link>
                        <p>{item.Continents}, {item.State}</p>
                        <p>{item.Domains}</p>
                        <p>{item.JobType}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}