import React, { useState, useEffect } from 'react';
import '../styles/jobs_abroad.css';
import '../styles/styles.css';
import { jobs_ar as jobs } from '../data/jobs';
import { Link } from 'react-router-dom';  

export default function JobsAbroad() {
  const [filterTypes, setFilterTypes] = useState({ Continents: '', State: '', Domains: '', JobType: '' });
  const [searchText, setSearchText] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    setFilteredJobs(jobs);
  }, []);

  const handleFilterChange = (event) => {
    setFilterTypes({
      ...filterTypes,
      [event.target.name]: event.target.value,
    });
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value.toLowerCase());
  };

  useEffect(() => {
    const filtered = jobs.filter((job) => {
      const { Continents, State, Domains, JobType } = filterTypes;
      const searchLower = searchText.toLowerCase();
      const jobTitle = job.jobTitle ? job.jobTitle.toLowerCase() : '';
      const jobDescription = job.jobDescription ? job.jobDescription.toLowerCase() : '';
      const continents = job.Continents ? job.Continents.toLowerCase() : '';
      const state = job.State ? job.State.toLowerCase() : '';
      const domain = job.Domains ? job.Domains.toLowerCase() : '';
      const jobType = job.JobType ? job.JobType.toLowerCase() : '';

      return (
        (!Continents || Continents === job.Continents) &&
        (!State || State === job.State) &&
        (!Domains || Domains === job.Domains) &&
        (!JobType || JobType === job.JobType) &&
        (searchLower === '' ||
          jobTitle.includes(searchLower) ||
          jobDescription.includes(searchLower) ||
          continents.includes(searchLower) ||
          state.includes(searchLower) ||
          domain.includes(searchLower) ||
          jobType.includes(searchLower))
      );
    });
    setFilteredJobs(filtered);
  }, [filterTypes, searchText]);

  const uniqueContinents = ['אסיה', 'אמריקה', 'אפריקה', 'אירופה', 'אוסטרליה'];
  const uniqueStates = ['ישראל', 'ארצות הברית', 'קנדה', 'בריטניה', 'גרמניה', 'צרפת', 'הודו', 'יפן', 'אוסטרליה'];
  const uniqueDomains = ['הנדסה', 'ניהול', 'טכנולוגיות מידע', 'שיווק', 'פיננסים', 'משאבי אנוש', 'עיצוב', 'הנדסה', 'מכירות', 'ייעוץ'];
  const uniqueJobTypes = ['חצי משרה', 'משרה מלאה', 'משרת אם'];

  return (
    <div className="JobsAbroad">
      <h2>משרות בחו"ל</h2>
      <div className="search-and-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="חיפוש משרות"
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>
        <div className="filter-buttons">
          <div className="filter-group">
            <label htmlFor="Continents">סינון לפי יבשת:</label>
            <select
              id="Continents"
              name="Continents"
              value={filterTypes.Continents}
              onChange={handleFilterChange}
            >
              <option value="">כל היבשות</option>
              {uniqueContinents.map((continent, index) => (
                <option key={index} value={continent}>
                  {continent}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="State">סינון לפי מדינה:</label>
            <select
              id="State"
              name="State"
              value={filterTypes.State}
              onChange={handleFilterChange}
            >
              <option value="">כל המדינות</option>
              {uniqueStates.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="Domains">סינון לפי תחום עבודה:</label>
            <select
              id="Domains"
              name="Domains"
              value={filterTypes.Domains}
              onChange={handleFilterChange}
            >
              <option value="">כל התחומים</option>
              {uniqueDomains.map((domain, index) => (
                <option key={index} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="JobType">סינון לפי סוג משרה:</label>
            <select
              id="JobType"
              name="JobType"
              value={filterTypes.JobType}
              onChange={handleFilterChange}
            >
              <option value="">כל סוגי המשרות</option>
              {uniqueJobTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="container">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <div key={index} className="job-item">
              <div className="text-content">
                <div className="img-container">
                  <img src={job.mainImg} alt="" className="main-img" />
                </div>
                <div className="text-wrapper">
                    <img src={job.countryFlag} alt="" width={19} />
                  <div className="text-content">
                    <Link to={`/job/${job.id}`} className="button-link">→</Link>
                    <p>{job.Continents}, {job.State}</p>
                    <p>{job.Domains}</p>
                    <p>{job.JobType}</p>
                    <p>{job.Salary}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>!מצטערים אך לא מצאנו את העבודה שחיפשת</p>
        )}
        
      </div>
      
    </div>
  );
}
