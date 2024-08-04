import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { JobsContext } from '../context/JobsContext';
import '../styles/jobDetail.css';
import ReactCountryFlag from "react-country-flag";

// Import the same mapping functions used in JobsComp
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

const getCountryCode = (countryName) => {
    return countryCodeMap[countryName] || "UN";
};

const getCountryImg = (countryName) => {
    return countryImg[countryName] || "https://via.placeholder.com/150";
};

export default function JobDetail() {
  const { id } = useParams();
  const { jobs } = useContext(JobsContext);
  const job = jobs.find(item => item.id === parseInt(id));

  if (!job) {
    return <div>המשרה לא נמצאה</div>;
  }

  return (
    <div className="job-detail-container">
      <h1>{job.jobTitle}</h1>
      <div className="image-container">
        <img src={getCountryImg(job.State)} alt="תמונת משרה" className="main-img" />
        <div className="location">
          <ReactCountryFlag 
            countryCode={getCountryCode(job.State)}
            svg
            style={{
              width: '30px',
              height: '23px',
              borderRadius: '50%',
              objectFit: 'cover',
              boxShadow: 'inset 0 0 8px rgba(255,255,255,0.6), 0 0 2px rgba(0,0,0,0.3)'
            }}
            title={job.State}
          />
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