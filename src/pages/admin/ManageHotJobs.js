import React, { useContext, useState, useEffect } from 'react';
import '../../styles/admin/manageHotJobs.css';
import { JobsContext } from '../../context/JobsContext';
import { TbFlame, TbFlameOff } from "react-icons/tb";

function ManageHotJobs() {
  const { jobs, updateJobs } = useContext(JobsContext);
  const [hotJobs, setHotJobs] = useState([]);
  const [expandedJobId, setExpandedJobId] = useState(null);

  useEffect(() => {
    setHotJobs(jobs.filter(job => job.status === 'מאושר'));
  }, [jobs]);

  const toggleHotJob = (job) => {
    const updatedJobs = jobs.map(j => 
      j.id === job.id ? { ...j, isHot: !j.isHot } : j
    );
    updateJobs(updatedJobs);
  };

  const toggleJobExpansion = (jobId) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  return (
    <div className="mhj-container">
      <h3 className="mhj-title">ניהול משרות חמות</h3>
      <div className="mhj-table-container">
        <table className="mhj-table">
          <thead>
            <tr>
              <th>תפקיד</th>
              <th>יבשת</th>
              <th>מדינה</th>
              <th>תחום</th>
              <th>סוג משרה</th>
              <th>שכר</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
            {hotJobs.map(job => (
              <tr key={job.id}>
                <td>{job.jobTitle}</td>
                <td>{job.Continents}</td>
                <td>{job.State}</td>
                <td>{job.Domains}</td>
                <td>{job.JobType}</td>
                <td>{job.Salary}</td>
                <td>
                  <button onClick={() => toggleHotJob(job)} className={job.isHot ? "mhj-remove-btn" : "mhj-add-btn"}>
                    {job.isHot ? <TbFlameOff /> : <TbFlame />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mhj-mobile-view">
        {hotJobs.map(job => (
          <div key={job.id} className={`mhj-job-card ${expandedJobId === job.id ? 'open' : ''}`}>
            <div className="mhj-job-header" onClick={() => toggleJobExpansion(job.id)}>
              <h2>{job.jobTitle}</h2>
              <p className='mhj-job-p'>{job.State}</p>
              <span className="mhj-expand-icon">{expandedJobId === job.id ? '▲' : '▼'}</span>
            </div>
            <div className="mhj-job-details">
              <p>יבשת: {job.Continents}</p>
              <p>מדינה: {job.State}</p>
              <p>תחום: {job.Domains}</p>
              <p>סוג משרה: {job.JobType}</p>
              <p>שכר: {job.Salary}</p>
              <button onClick={() => toggleHotJob(job)} className={job.isHot ? "mhj-remove-btn" : "mhj-add-btn"}>
                 {job.isHot ? <TbFlameOff /> : <TbFlame />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageHotJobs;