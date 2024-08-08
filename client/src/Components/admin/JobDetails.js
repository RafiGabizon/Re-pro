import React, { useState, useEffect } from 'react';
import { hebrewLabels, uniqueContinents, uniqueStates, uniqueDomains, uniqueJobTypes } from './constants';

function JobDetails({ job, isOpen, handleFieldChange, saveJobChanges }) {
  const [localEditedJob, setLocalEditedJob] = useState({});

  useEffect(() => {
    setLocalEditedJob({});
  }, [job.id]);

  const handleLocalFieldChange = (key, value) => {
    setLocalEditedJob(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const renderField = (key, value) => {
    const editedValue = localEditedJob.hasOwnProperty(key) ? localEditedJob[key] : value;
    
     switch (key) {
      case 'Continents':
        return (
          <select 
            value={editedValue}
            onChange={(e) => handleLocalFieldChange(key, e.target.value)}
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
            value={editedValue}
            onChange={(e) => handleLocalFieldChange(key, e.target.value)}
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
            value={editedValue}
            onChange={(e) => handleLocalFieldChange(key, e.target.value)}
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
            value={editedValue}
            onChange={(e) => handleLocalFieldChange(key, e.target.value)}
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
            value={editedValue || ''}
            onChange={(e) => handleLocalFieldChange(key, e.target.value)}
            placeholder={hebrewLabels[key] || key}
          />
        );
      default:
        return (
          <input 
            value={editedValue || ''}
            onChange={(e) => handleLocalFieldChange(key, e.target.value)}
            placeholder={hebrewLabels[key] || key}
          />
        );
    }
  };


  const handleSave = () => {
    const updatedJob = { ...job, ...localEditedJob };
    saveJobChanges(updatedJob);
    setLocalEditedJob({});
  };

  if (!isOpen) return null;

  return (
    <div className={`mj-job-details open`}>
      <h2>{job.jobTitle}</h2>
      {Object.entries(job).map(([key, value]) => (
        key !== 'id' && key !== 'status' && key !== 'mainImg' && key !== 'countryFlag' && key !== 'isHot' && (
          <div key={key}>
            <p>{hebrewLabels[key] || key}:</p>
            {renderField(key, value)}
          </div>
        )
      ))}
      {['housing', 'visaRequirements', 'minCommitment', 'flightReimbursement', 'requirements'].map(key => (
        !job.hasOwnProperty(key) && (
          <div key={key}>
            <p>{hebrewLabels[key] || key}:</p>
            {renderField(key, '')}
          </div>
        )
      ))}
      <button onClick={handleSave} className="mj-save-job-btn">שמור שינויים</button>
    </div>
  );
}

export default JobDetails;