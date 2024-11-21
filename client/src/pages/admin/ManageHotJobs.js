// Importing necessary dependencies
import React, { useContext, useState, useEffect } from 'react'; // Import React and hooks for state, lifecycle, and context management
import '../../styles/admin/manageHotJobs.css'; // Import CSS for styling the component
import { JobsContext } from '../../context/JobsContext'; // Import JobsContext for accessing jobs data
import { TbFlame, TbFlameOff } from "react-icons/tb"; // Import icons for indicating hot job status

// Functional component for managing hot jobs
function ManageHotJobs() {
  const { jobs, updateJobs } = useContext(JobsContext); // Access jobs and updater function from JobsContext
  const [hotJobs, setHotJobs] = useState([]); // State for storing hot jobs
  const [expandedJobId, setExpandedJobId] = useState(null); // State for tracking expanded job in mobile view

  // Filter and set hot jobs when jobs data changes
  useEffect(() => {
    setHotJobs(jobs.filter(job => job.status === 'מאושר')); // Filter jobs with status 'מאושר'
  }, [jobs]);

  // Toggle a job's hot status
  const toggleHotJob = (job) => {
    const updatedJobs = jobs.map(j => 
      j.id === job.id ? { ...j, isHot: !j.isHot } : j // Toggle the isHot property
    );
    updateJobs(updatedJobs); // Update the jobs data in context
  };

  // Toggle the expansion state of a job in mobile view
  const toggleJobExpansion = (jobId) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId); // Expand or collapse the job details
  };

  return (
    <div className="mhj-container">
      <h3 className="mhj-title">ניהול משרות חמות</h3> {/* Component title */}
      
      {/* Desktop view */}
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
                <td>{job.jobTitle}</td> {/* Job title */}
                <td>{job.Continents}</td> {/* Job continent */}
                <td>{job.State}</td> {/* Job state */}
                <td>{job.Domains}</td> {/* Job domain */}
                <td>{job.JobType}</td> {/* Job type */}
                <td>{job.Salary}</td> {/* Job salary */}
                <td>
                  <button onClick={() => toggleHotJob(job)} className={job.isHot ? "mhj-remove-btn" : "mhj-add-btn"}>
                    {job.isHot ? <TbFlameOff /> : <TbFlame />} {/* Icon to toggle hot job */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Mobile view */}
      <div className="mhj-mobile-view">
        {hotJobs.map(job => (
          <div key={job.id} className={`mhj-job-card ${expandedJobId === job.id ? 'open' : ''}`}>
            <div className="mhj-job-header" onClick={() => toggleJobExpansion(job.id)}>
              <h2>{job.jobTitle}</h2> {/* Job title */}
              <p className='mhj-job-p'>{job.State}</p> {/* Job state */}
              <span className="mhj-expand-icon">{expandedJobId === job.id ? '▲' : '▼'}</span> {/* Expand/collapse icon */}
            </div>
            <div className="mhj-job-details">
              <p>יבשת: {job.Continents}</p> {/* Job continent */}
              <p>מדינה: {job.State}</p> {/* Job state */}
              <p>תחום: {job.Domains}</p> {/* Job domain */}
              <p>סוג משרה: {job.JobType}</p> {/* Job type */}
              <p>שכר: {job.Salary}</p> {/* Job salary */}
              <button onClick={() => toggleHotJob(job)} className={job.isHot ? "mhj-remove-btn" : "mhj-add-btn"}>
                 {job.isHot ? <TbFlameOff /> : <TbFlame />} {/* Icon to toggle hot job */}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageHotJobs; // Export the component for use in other parts of the application
