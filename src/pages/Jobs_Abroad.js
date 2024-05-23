import React, { useState } from 'react';
import '../styles/jobs_abroad.css';

export default function JobsAbroad() {
  const [filterTypes, setFilterTypes] = useState({ continent: '', location: '', jobTitle: '' }); // Object for filters
  const [searchText, setSearchText] = useState(''); // Search keyword
  const [jobs, setJobs] = useState([ // Sample job data
    { id: 1, title: 'עבודה כמפתח תוכנה', location: 'ארצות הברית', continent: 'צפון אמריקה' },
    { id: 2, title: 'עבודה בתחום השיווק', location: 'קנדה', continent: 'צפון אמריקה' },
    { id: 3, title: 'עבודה כמנהל פרויקטים', location: 'אוסטרליה', continent: 'אוקיאניה' },
    // Add more jobs as needed
  ]);

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
  const filteredJobs = () => {
    return jobs.filter((job) => {
      const { continent, location, jobTitle } = filterTypes;
      const jobTitleLower = job.title.toLowerCase(); // Convert job title to lowercase for case-insensitive search
      return (
        (!continent || continent === job.continent) &&
        (!location || location === job.location) &&
        (!jobTitle || job.title === jobTitle) &&
        jobTitleLower.includes(searchText) // Check if job title includes search text (case-insensitive)
      );
    });
  };

  // Get unique job titles for the job title filter
  const uniqueJobTitles = [...new Set(jobs.map(job => job.title))];

  return (
    <div>
      <div className="JobsAbroad">
        <h2> משרות בחו"ל</h2> {/* Title: Jobs Abroad */}
        {/* Search box and filter buttons together */}
        <div className="search-and-filters">
          <div className="search-box">
            <input type="text" placeholder="חיפוש משרות" value={searchText} onChange={handleSearchChange} />
          </div>
          <div className="filter-buttons">
            <div className="filter-group">
              <label htmlFor="continent">סינון לפי יבשת:</label>
              <select id="continent" name="continent" value={filterTypes.continent} onChange={handleFilterChange}>
                <option value="">כל היבשות</option>
                <option value="צפון אמריקה">צפון אמריקה</option>
                <option value="דרום אמריקה">דרום אמריקה</option>
                <option value="אירופה">אירופה</option>
                <option value="אסיה">אסיה</option>
                <option value="אפריקה">אפריקה</option>
                <option value="אוקיאניה">אוקיאניה</option>
              </select>
            </div>
            <div className="filter-group">
              <label htmlFor="location">סינון לפי מיקום:</label>
              <select id="location" name="location" value={filterTypes.location} onChange={handleFilterChange}>
                <option value="">כל המיקומים</option>
                {jobs.map((job) => (
                  <option key={job.id} value={job.location}>
                    {job.location}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label htmlFor="jobTitle">סינון לפי סוג עבודה:</label>
              <select id="jobTitle" name="jobTitle" value={filterTypes.jobTitle} onChange={handleFilterChange}>
                <option value="">כל העבודות</option>
                {uniqueJobTitles.map((title, index) => (
                  <option key={index} value={title}>
                    {title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* Display filtered jobs */}
        <div>
          {filteredJobs().map((job) => (
            <div className="job-listing" key={job.id}>
              <h3>{job.title}</h3>
              <p>{job.location}</p>
              {/* Add more job details as needed */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
