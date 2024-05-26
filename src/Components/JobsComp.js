import React from "react";
import { jobs_ar } from "../data/jobs";
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
                    <img src={item.countryFlag} alt="" width={19} />
                    <div className="text-content">
                    <a href="" className="button-link">→</a>
                    <p>{item.country}, {item.city}</p>
                    <p>{item.jobType}</p>
                    <p>{item.salary}</p>
                    </div>
                </div>
                </div>
            </div>
            ))}
        </div>
)
}