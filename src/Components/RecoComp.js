import React from "react";
import { reco_ar } from "../data/recommands";
import '../styles/recoStyles.css';

export default function Recommands() {
    return(
        <div className="recoContainer">
            {reco_ar.map((item, index) => (
                <div>
                    <div className="reco-content">
                <div className="img-container">
                    <img src={item.mainVid} alt="" className="main-vid" />
                </div>
                <div className="text-wrapper">
                    <div className="reco-text-wrapper">
                    <a href="" className="button-link">→</a>
                    <p>{item.recoName}</p>
                    <p>{item.jobType}</p>
                    <p>{item.spich}</p>
                    </div>
                </div>
                </div>
                </div>

            ))}
        </div>

    )


}