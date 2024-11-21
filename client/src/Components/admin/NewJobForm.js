// Importing necessary dependencies and constants
import React, { useState } from 'react'; // Import React and the useState hook for managing state
import { uniqueContinents, uniqueStates, uniqueDomains, uniqueJobTypes, hebrewLabels } from './constants'; // Import constants for options and labels

// Functional component for adding a new job
function NewJobForm({ updateJobs }) {
  // State for managing the new job details
  const [newJob, setNewJob] = useState({
    jobTitle: '', // Job title
    Continents: '', // Continent selection
    State: '', // State selection
    Domains: '', // Job domain
    JobType: '', // Job type
    Salary: '', // Salary details
    jobDescription: '', // Job description
    housing: '', // Housing benefits
    visaRequirements: '', // Visa requirements
    minCommitment: '', // Minimum commitment period
    flightReimbursement: '', // Flight reimbursement details
    requirements: '', // Job requirements
    companyVideoUrl: '', // Company video URL
    employeeTestimonials: '', // Employee testimonials
    status: 'ממתין לאישור' // Default status for new jobs
  });

  // Function to handle changes to the new job fields
  const handleNewJobChange = (field, value) => {
    setNewJob(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  // Function to validate and add a new job
  const addNewJob = () => {
    if (newJob.jobTitle && newJob.Continents && newJob.State && newJob.Domains && newJob.JobType && newJob.Salary && newJob.jobDescription) {
      const jobToAdd = {
        ...newJob, // Include all fields from the state
        id: Date.now(), // Generate a unique ID for the new job
        mainImg: "https://via.placeholder.com/150", // Placeholder for the main image
        countryFlag: "https://via.placeholder.com/30", // Placeholder for the country flag
        employeeTestimonials: newJob.employeeTestimonials ? JSON.parse(newJob.employeeTestimonials) : [] // Parse testimonials if provided
      };
      updateJobs(prevJobs => [...prevJobs, jobToAdd]); // Add the new job to the jobs list
      // Reset the form fields
      setNewJob({
        jobTitle: '',
        Continents: '',
        State: '',
        Domains: '',
        JobType: '',
        Salary: '',
        jobDescription: '',
        housing: '',
        visaRequirements: '',
        minCommitment: '',
        flightReimbursement: '',
        requirements: '',
        companyVideoUrl: '',
        employeeTestimonials: '',
        status: 'ממתין לאישור'
      });
      alert('המשרה החדשה נוספה בהצלחה'); // Success message
    } else {
      alert('נא למלא את כל השדות הנדרשים'); // Error message if required fields are missing
    }
  };

  return (
    <div className="mj-new-job-form">
      <h2 className="mj-subtitle">הוסף משרה חדשה</h2>
      {/* Generate input fields dynamically based on the newJob state */}
      {Object.entries(newJob).map(([key, value]) => (
        key !== 'id' && key !== 'status' && key !== 'mainImg' && key !== 'countryFlag' && (
          <div key={key}>
            {key === 'Continents' ? ( // Dropdown for selecting a continent
              <select 
                value={value} 
                onChange={(e) => handleNewJobChange(key, e.target.value)}
              >
                <option value="">בחר יבשת</option>
                {uniqueContinents.map(continent => (
                  <option key={continent} value={continent}>{continent}</option>
                ))}
              </select>
            ) : key === 'State' ? ( // Dropdown for selecting a state
              <select 
                value={value} 
                onChange={(e) => handleNewJobChange(key, e.target.value)}
              >
                <option value="">בחר מדינה</option>
                {uniqueStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            ) : key === 'Domains' ? ( // Dropdown for selecting a job domain
              <select 
                value={value} 
                onChange={(e) => handleNewJobChange(key, e.target.value)}
              >
                <option value="">בחר תחום</option>
                {uniqueDomains.map(domain => (
                  <option key={domain} value={domain}>{domain}</option>
                ))}
              </select>
            ) : key === 'JobType' ? ( // Dropdown for selecting a job type
              <select 
                value={value} 
                onChange={(e) => handleNewJobChange(key, e.target.value)}
              >
                <option value="">בחר סוג משרה</option>
                {uniqueJobTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            ) : key === 'jobDescription' || key === 'requirements' || key === 'employeeTestimonials' ? ( // Textarea for multiline input fields
              <textarea 
                value={value} 
                onChange={(e) => handleNewJobChange(key, e.target.value)}
                placeholder={hebrewLabels[key] || key}
              />
            ) : ( // Default input field for other types
              <input 
                value={value} 
                onChange={(e) => handleNewJobChange(key, e.target.value)}
                placeholder={hebrewLabels[key] || key}
              />
            )}
          </div>
        )
      ))}
      {/* Button to add a new job */}
      <button onClick={addNewJob} className="mj-add-btn">הוסף משרה</button>
    </div>
  );
}

export default NewJobForm;
