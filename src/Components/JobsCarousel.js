import React from "react";
import Slider from "react-slick";
import { jobs_ar } from "../data/jobs";
import { Link } from 'react-router-dom';
import '../styles/styles.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function JobsCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false, // Hide the arrows for a cleaner look
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {jobs_ar.map((item, index) => (
          <div key={index} className="job-item">
            <div className="img-container">
              <img src={item.mainImg} alt="" className="main-img" />
            </div>
            <div className="text-wrapper">
              <img src={item.countryFlag} alt="" width={20} />
              <div className="text-content">
                <Link to={`/job/${item.id}`} className="button-link">→</Link>
                <p>{item.Continents}, {item.State}</p>
                <p>{item.Domains}</p>
                <p>{item.JobType}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
