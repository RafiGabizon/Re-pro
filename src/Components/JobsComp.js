import React from "react";
import { jobs_ar } from "../data/jobs";
import { Link } from 'react-router-dom';
import '../styles/styles.css';

export default function JobsComp() {
    return(
    <div className="container">
            {jobs_ar.map((item, index) => (
            <div key={index} className="job-item">
                <div className="text-content">
                <div className="img-container">
                    <img src={item.mainImg} alt="" className="main-img" />
                </div>
                <div className="text-wrapper">
                    <img src={item.countryFlag} alt="" width={20} marginBottom={10} />
                    <div className="text-content">
                    <Link to={`/job/${item.id}`} className="button-link">→</Link>
                    <p>{item.Continents}, {item.State}</p>
                    <p>{item.Domains}</p>
                    <p>{item.JobType}</p>
                    <p>{item.Salary}</p>
                    </div>
                </div>
                </div>
            </div>
            ))}
        </div>
)
}