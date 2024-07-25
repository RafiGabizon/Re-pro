import React from "react";
import { reco_ar } from "../data/recommands";
import '../styles/recoStyles.css';
import { FaQuoteLeft, FaQuoteRight, FaArrowLeft } from 'react-icons/fa';

export default function RecoComp() {
    return (
        <div className="reco-container">
            <h2 className="reco-title">המלצות מעובדים</h2>
            <div className="reco-grid">
                {reco_ar.map((item, index) => (
                    <div key={index} className="reco-card">
                        <div className="reco-image">
                            <img src={item.mainVid} alt={item.recoName} className="reco-avatar" />
                        </div>
                        <div className="reco-content">
                            <h3 className="reco-name">{item.recoName}</h3>
                            <p className="reco-job">{item.jobType}</p>
                            <div className="reco-speech">
                                <FaQuoteRight className="quote-icon right" />
                                <p className="speech-text">{item.spich}</p>
                                <FaQuoteLeft className="quote-icon left" />
                            </div>
                            <a href="/Recommands" className="reco-link">
                                קרא עוד <FaArrowLeft className="arrow-icon" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}