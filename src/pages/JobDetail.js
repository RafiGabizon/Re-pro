import React from 'react';
import { useParams } from 'react-router-dom';
import { jobs_ar } from '../data/jobs';
import '../styles/jobDetail.css';

export default function JobDetail() {
  const { id } = useParams();
  const job = jobs_ar.find(item => item.id === parseInt(id));

  if (!job) {
    return <div>המשרה לא נמצאה</div>;
  }

  return (
    <div className="job-detail-container">
      <h1>{job.jobTitle}</h1>
      <div className="image-container">
        <img src={job.mainImg} alt="תמונת משרה" className="main-img" />
        <div className="location">
          <img src={job.countryFlag} alt="דגל המדינה" />
          <p>{job.Continents}, {job.State}</p>
        </div>
      </div>
      <div className="job-info">
        <div className="info-item">
          <h3>תחום</h3>
          <p>{job.Domains}</p>
        </div>
        <div className="info-item">
          <h3>סוג משרה</h3>
          <p>{job.JobType}</p>
        </div>
        <div className="info-item">
          <h3>שכר</h3>
          <p>{job.Salary}</p>
        </div>
      </div>
      <div className="job-description">
        <h2>תיאור המשרה</h2>
        <p>{job.jobDescription}</p>
      </div>
    </div>
  );
}