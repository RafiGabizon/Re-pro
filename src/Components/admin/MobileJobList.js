import React from 'react';
import { hebrewLabels, uniqueContinents, uniqueStates, uniqueDomains, uniqueJobTypes } from './constants';

function MobileJobList({ jobs, editedJobs, openJobId, handleFieldChange, saveJobChanges, approveJob, rejectJob, deleteJob, toggleJobDetails }) {
  const renderField = (job, key, value) => {
    switch (key) {
      case 'Continents':
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
      case 'State':
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
      case 'Domains':
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
      case 'JobType':
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
      {jobs.map(job => (
        <div key={job.id} className={`mj-mobile-job-card ${openJobId === job.id ? 'open' : ''}`}>
          <div className="mj-mobile-job-header" onClick={() => toggleJobDetails(job.id)}>
            <div>
              <h2 title={job.jobTitle}>{job.jobTitle}</h2>
              <p>{job.State}, {job.status}</p>
            </div>
            <span className="mj-expand-icon">{openJobId === job.id ? '▲' : '▼'}</span>
          </div>
          {openJobId === job.id && (
            <div className="mj-mobile-job-details">
              {Object.entries(job).map(([key, value]) => (
                key !== 'id' && key !== 'status' && key !== 'mainImg' && key !== 'countryFlag' && key !== 'isHot' && (
                  <div key={key}>
                    <p>{hebrewLabels[key] || key}:</p>
                    {renderField(job, key, value)}
                  </div>
                )
              ))}
              {['housing', 'visaRequirements', 'minCommitment', 'flightReimbursement', 'requirements'].map(key => (
                !job.hasOwnProperty(key) && (
                  <div key={key}>
                    <p>{hebrewLabels[key] || key}:</p>
                    {renderField(job, key, '')}
                  </div>
                )
              ))}
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