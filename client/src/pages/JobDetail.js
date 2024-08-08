import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { JobsContext } from '../context/JobsContext';
import ReactCountryFlag from "react-country-flag";
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import '../styles/jobDetail.css';

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const job = jobs.find(item => item.id === parseInt(id));

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, [location]);

  if (!job) {
    return <div>המשרה לא נמצאה</div>;
  }

  const backgroundImage = getCountryImg(job.State);

  const handleLoginClick = () => {
    navigate('/login', { state: { from: location } });
  };

  return (
    <div className="job-detail-container">
      <div 
        className="job-header" 
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="job-header-content">
          <div className="job-location">
            <ReactCountryFlag 
              countryCode={getCountryCode(job.State)}
              svg
              style={{
                width: '30px',
                height: '23px',
                borderRadius: '50%',
                marginRight: '10px'
              }}
            />
            <span>{job.Continents}, {job.State}</span>
          </div>
          <h1>{job.jobTitle}</h1>
          <div className="share-buttons">
            <FaFacebook />
            <FaTwitter />
            <FaLinkedin />
            <FaWhatsapp />
          </div>
        </div>
      </div>

      {isLoggedIn ? (
        <>
          <h2>תנאים</h2>
          <div className="job-conditions">
            {[
              { title: "מגורים", value: job.housing },
              { title: "שכר", value: job.Salary },
              { title: "היקף משרה", value: job.JobType },
              { title: "ויזה/דרכון", value: job.visaRequirements },
              { title: "התחייבות מינימום", value: job.minCommitment },
              { title: "החזרי טיסות", value: job.flightReimbursement }
            ].map((item, index) => (
              <div key={index} className="condition-item">
                <h3>{item.title}</h3>
                <p>{item.value || 'מידע לא זמין'}</p>
              </div>
            ))}
          </div>

          <div className="job-details-grid">
            <div className="job-requirements">
              <h2>דרישות</h2>
              <p>{job.requirements || 'אין דרישות מיוחדות'}</p>
            </div>
            <div className="job-description">
              <h2>תיאור המשרה והחברה</h2>
              <p>{job.jobDescription || 'אין תיאור זמין'}</p>
            </div>
          </div>

          <button className="more-info-button" onClick={() => setShowMoreInfo(!showMoreInfo)}>
            לעוד מידע על העבודה
          </button>

          {showMoreInfo && (
            <div className="additional-info">
              <div className="company-video">
                <h2>מנהל החברה מספר</h2>
                {job.companyVideoUrl ? (
                  <video src={job.companyVideoUrl} controls />
                ) : (
                  <p>אין סרטון זמין</p>
                )}
              </div>
              <div className="employee-testimonials">
                <h2>עובדים מספרים</h2>
                {job.employeeTestimonials && job.employeeTestimonials.length > 0 ? (
                  <div className="testimonial-grid">
                    {job.employeeTestimonials.map((testimonial, index) => (
                      <div key={index} className="testimonial-item">
                        <video src={testimonial.videoUrl} controls />
                        <p>{testimonial.name}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>אין עדויות עובדים זמינות</p>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="login-prompt">
          <p>כדי לצפות בפרטים המלאים של המשרה, אנא התחבר או הירשם.</p>
          <button onClick={handleLoginClick} className="login-button">התחברות</button>
          <Link to="/register" className="register-button">הרשמה</Link>
        </div>
      )}
    </div>
  );
}