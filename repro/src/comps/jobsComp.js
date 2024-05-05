import React, { Component } from "react";
import { jobs_ar } from "../data/jobs";

class JobsComp extends Component {
    state = { jobs_ar: jobs_ar };

    render() {
        return (
            <div className="container">
                {this.state.jobs_ar.map((item, index) => (
                    <div key={index} className="job-item">
                        <div className="text-content">
                            <div className="img-container">
                                <img src={item.mainImg} alt="" className="main-img" />
                            </div>
                            <div className="text-wrapper">
                            <div className="text-content">
                                <img src={item.countryFlag} alt="" width={19}/>
                                <a href="" className="button-link">→</a>
                                <p>{item.country},{item.city}</p>
                                <p>{item.jobType}</p>
                                <p>{item.salray}</p> 
                            </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default JobsComp;