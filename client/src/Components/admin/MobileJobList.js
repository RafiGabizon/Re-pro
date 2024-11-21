// Importing necessary dependencies and constants
import React from 'react'; // Import React to enable JSX syntax
import { hebrewLabels, uniqueContinents, uniqueStates, uniqueDomains, uniqueJobTypes } from './constants'; // Importing constants for labels and options

// Functional component for rendering a mobile-friendly job list with details and actions
function MobileJobList({ 
  jobs, // Array of jobs to display
  editedJobs, // Object containing locally edited job data
  openJobId, // ID of the job currently expanded to show details
  handleFieldChange, // Function to handle field changes
  saveJobChanges, // Function to save changes to a job
  approveJob, // Function to approve a job
  rejectJob, // Function to reject a job
  deleteJob, // Function to delete a job
  toggleJobDetails // Function to toggle job details visibility
}) {
  
  // Function to dynamically render input fields based on the field type
  const renderField = (job, key, value) => {
    switch (key) {
      case 'Continents': // Dropdown for selecting a continent
        return (
          <select 
            value={editedJobs[job.id]?.[key] || value}
            onChange={(e) => handleFieldChange(job.id, key, e.target.value)}
          >
            <option value="">בחר יבשת</option>
            {uniqueContinents.map(continent => (
              <option key={continent} value={continent}>{continent}</option>
            ))}
          </select>
        );
      case 'State': // Dropdown for selecting a state
        return (
          <select 
            value={editedJobs[job.id]?.[key] || value}
            onChange={(e) => handleFieldChange(job.id, key, e.target.value)}
          >
            <option value="">בחר מדינה</option>
            {uniqueStates.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        );
      case 'Domains': // Dropdown for selecting a domain
        return (
          <select 
            value={editedJobs[job.id]?.[key] || value}
            onChange={(e) => handleFieldChange(job.id, key, e.target.value)}
          >
            <option value="">בחר תחום</option>
            {uniqueDomains.map(domain => (
              <option key={domain} value={domain}>{domain}</option>
            ))}
          </select>
        );
      case 'JobType': // Dropdown for selecting a job type
        return (
          <select 
            value={editedJobs[job.id]?.[key] || value}
            onChange={(e) => handleFieldChange(job.id, key, e.target.value)}
          >
            <option value="">בחר סוג משרה</option>
            {uniqueJobTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        );
      // Textarea for multiline inputs
      case 'jobDescription':
      case 'housing':
      case 'visaRequirements':
      case 'minCommitment':
      case 'flightReimbursement':
      case 'requirements':
        return (
          <textarea 
            value={editedJobs[job.id]?.[key] || value || ''}
            onChange={(e) => handleFieldChange(job.id, key, e.target.value)}
            placeholder={hebrewLabels[key] || key}
          />
        );
      // Default case for regular input fields
      default:
        return (
          <input 
            value={editedJobs[job.id]?.[key] || value || ''}
            onChange={(e) => handleFieldChange(job.id, key, e.target.value)}
            placeholder={hebrewLabels[key] || key}
          />
        );
    }
  };

  return (
    <div className="mj-mobile-jobs-list">
      {/* Iterate through the jobs and render cards for each */}
      {jobs.map(job => (
        <div key={job.id} className={`mj-mobile-job-card ${openJobId === job.id ? 'open' : ''}`}>
          {/* Header displaying the job title and status, toggling details on click */}
          <div className="mj-mobile-job-header" onClick={() => toggleJobDetails(job.id)}>
            <div>
              <h2 title={job.jobTitle}>{job.jobTitle}</h2>
              <p>{job.State}, {job.status}</p>
            </div>
            <span className="mj-expand-icon">{openJobId === job.id ? '▲' : '▼'}</span>
          </div>
          {/* Expanded details section */}
          {openJobId === job.id && (
            <div className="mj-mobile-job-details">
              {/* Dynamically render fields for job details */}
              {Object.entries(job).map(([key, value]) => (
                key !== 'id' && key !== 'status' && key !== 'mainImg' && key !== 'countryFlag' && key !== 'isHot' && (
                  <div key={key}>
                    <p>{hebrewLabels[key] || key}:</p>
                    {renderField(job, key, value)}
                  </div>
                )
              ))}
              {/* Render additional fields if they are not already present in the job object */}
              {['housing', 'visaRequirements', 'minCommitment', 'flightReimbursement', 'requirements'].map(key => (
                !job.hasOwnProperty(key) && (
                  <div key={key}>
                    <p>{hebrewLabels[key] || key}:</p>
                    {renderField(job, key, '')}
                  </div>
                )
              ))}
              {/* Action buttons for saving, approving, rejecting, and deleting the job */}
              <div className="mj-mobile-job-actions">
                <button onClick={() => saveJobChanges(job.id)} className="mj-save-btn">שמור</button>
                {(!job.status || job.status === 'ממתין לאישור') && (
                  <>
                    <button onClick={() => approveJob(job.id)} className="mj-approve-btn">אשר</button>
                    <button onClick={() => rejectJob(job.id)} className="mj-reject-btn">דחה</button>
                  </>
                )}
                <button onClick={() => deleteJob(job.id)} className="mj-delete-btn">מחק</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default MobileJobList;
