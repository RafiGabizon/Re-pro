import React, { useState, useEffect } from 'react';
import '../styles/jobs_abroad.css';
import '../styles/styles.css'; // Ensure this stylesheet is included
import { jobs_ar as jobs } from '../data/jobs'; // Assuming jobs data is imported from a separate file

export default function JobsAbroad() {
  const [filterTypes, setFilterTypes] = useState({ country: '', city: '', jobType: '' }); // Object for filters
  const [searchText, setSearchText] = useState(''); // Search keyword
  const [filteredJobs, setFilteredJobs] = useState([]); // State for filtered jobs

  useEffect(() => {
    setFilteredJobs(jobs); // Set initial filtered jobs to all jobs
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  // Function to handle filter changes (updates filterTypes state)
  const handleFilterChange = (event) => {
    setFilterTypes({
      ...filterTypes,
      [event.target.name]: event.target.value,
    });
  };

  // Function to handle search text change
  const handleSearchChange = (event) => {
    setSearchText(event.target.value.toLowerCase()); // Convert search text to lowercase for case-insensitive search
  };

  // Function to filter jobs based on selected filters and search text
  useEffect(() => {
    const filtered = jobs.filter((job) => {
      const { country, city, jobType } = filterTypes;
      const jobTypeLower = job.jobType ? job.jobType.toLowerCase() : ''; // Ensure job.jobType is defined
      return (
        (!country || country === job.country) &&
        (!city || city === job.city) &&
        (!jobType || jobType === job.jobType) &&
        jobTypeLower.includes(searchText) // Case-insensitive search
      );
    });
    setFilteredJobs(filtered);
  }, [filterTypes, searchText]); // Dependency array for filter changes and search text

  // Get unique job types for the job type filter
  const uniqueJobTypes = [...new Set(jobs.map(job => job.jobType))];

  return (
    <div className="JobsAbroad">
      <h2>משרות בחו"ל</h2> {/* Title: Jobs Abroad */}
      {/* Search box and filter buttons together */}
      <div className="search-and-filters">
        <div className="search-box">
          <input type="text" placeholder="חיפוש משרות" value={searchText} onChange={handleSearchChange} />
        </div>
        <div className="filter-buttons">
          <div className="filter-group">
            <label htmlFor="country">סינון לפי מדינה:</label>
            <select id="country" name="country" value={filterTypes.country} onChange={handleFilterChange}>
              <option value="">כל המדינות</option>
              <option value="Israel">ישראל</option>
              <option value="USA">ארצות הברית</option>
              {/* ... other countries ... */}
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="city">סינון לפי עיר:</label>
            <select id="city" name="city" value={filterTypes.city} onChange={handleFilterChange}>
              <option value="">כל הערים</option>
              {/*
                Dynamically populate city options based on unique cities in jobs data
              */}
              {jobs.map((job, index) => (
                <option key={index} value={job.city}>
                  {job.city}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="jobType">סינון לפי סוג עבודה:</label>
            <select id="jobType" name="jobType" value={filterTypes.jobType} onChange={handleFilterChange}>
              <option value="">כל העבודות</option>
              {uniqueJobTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* Display filtered jobs */}
      <div className="container">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <div key={index} className="job-item">
              <div className="text-content">
                <div className="img-container">
                  <img src={job.mainImg} alt="" className="main-img" />
                </div>
                <div className="text-wrapper">
                  <div className="text-content">
                    <img src={job.countryFlag} alt="" width={19} />
                    <a href="" className="button-link">→</a>
                    <p>{job.country}, {job.city}</p>
                    <p>{job.jobType}</p>
                    <p>{job.salary}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No jobs found matching your filters.</p>
        )}
      </div>
    </div>
  );
}
