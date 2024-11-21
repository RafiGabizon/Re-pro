// Importing necessary dependencies and constants
import React, { useState, useEffect } from 'react'; // React and hooks for managing state and side effects
import { hebrewLabels, uniqueContinents, uniqueStates, uniqueDomains, uniqueJobTypes } from './constants'; // Importing constants for labels and options

// Functional component for rendering job details and editing functionality
function JobDetails({ job, isOpen, handleFieldChange, saveJobChanges }) {
  const [localEditedJob, setLocalEditedJob] = useState({}); // State to manage locally edited job details

  useEffect(() => {
    setLocalEditedJob({}); // Reset local edits when the job ID changes
  }, [job.id]);

  // Function to handle changes in local field values
  const handleLocalFieldChange = (key, value) => {
    setLocalEditedJob(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Function to dynamically render input fields based on the field type
  const renderField = (key, value) => {
    const editedValue = localEditedJob.hasOwnProperty(key) ? localEditedJob[key] : value;

    switch (key) {
      case 'Continents': // Dropdown for selecting a continent
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
      case 'State': // Dropdown for selecting a state
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
      case 'Domains': // Dropdown for selecting a domain
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
      case 'JobType': // Dropdown for selecting a job type
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
      // Textarea for multiline inputs
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
      // Default case for regular input fields
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

  // Function to save changes and reset local state
  const handleSave = () => {
    const updatedJob = { ...job, ...localEditedJob }; // Merge original job data with local edits
    saveJobChanges(updatedJob); // Save the updated job details
    setLocalEditedJob({}); // Reset local edits
  };

  if (!isOpen) return null; // Do not render if the component is closed

  return (
    <div className={`mj-job-details open`}>
      {/* Display the job title */}
      <h2>{job.jobTitle}</h2>

      {/* Render fields dynamically based on the job data */}
      {Object.entries(job).map(([key, value]) => (
        key !== 'id' && key !== 'status' && key !== 'mainImg' && key !== 'countryFlag' && key !== 'isHot' && (
          <div key={key}>
            <p>{hebrewLabels[key] || key}:</p>
            {renderField(key, value)}
          </div>
        )
      ))}

      {/* Render additional fields that may not exist in the job data */}
      {['housing', 'visaRequirements', 'minCommitment', 'flightReimbursement', 'requirements'].map(key => (
        !job.hasOwnProperty(key) && (
          <div key={key}>
            <p>{hebrewLabels[key] || key}:</p>
            {renderField(key, '')}
          </div>
        )
      ))}

      {/* Save button to save job changes */}
      <button onClick={handleSave} className="mj-save-job-btn">שמור שינויים</button>
    </div>
  );
}

export default JobDetails;
