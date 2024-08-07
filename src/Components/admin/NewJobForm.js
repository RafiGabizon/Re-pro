import React, { useState } from 'react';
import { uniqueContinents, uniqueStates, uniqueDomains, uniqueJobTypes, hebrewLabels } from './constants';

function NewJobForm({ updateJobs }) {
  const [newJob, setNewJob] = useState({
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

  const handleNewJobChange = (field, value) => {
    setNewJob(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const addNewJob = () => {
    if (newJob.jobTitle && newJob.Continents && newJob.State && newJob.Domains && newJob.JobType && newJob.Salary && newJob.jobDescription) {
      const jobToAdd = {
        ...newJob,
        id: Date.now(),
        mainImg: "https://via.placeholder.com/150",
        countryFlag: "https://via.placeholder.com/30",
        employeeTestimonials: newJob.employeeTestimonials ? JSON.parse(newJob.employeeTestimonials) : []
      };
      updateJobs(prevJobs => [...prevJobs, jobToAdd]);
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
      alert('המשרה החדשה נוספה בהצלחה');
    } else {
      alert('נא למלא את כל השדות הנדרשים');
    }
  };

  return (
    <div className="mj-new-job-form">
      <h2 className="mj-subtitle">הוסף משרה חדשה</h2>
      {Object.entries(newJob).map(([key, value]) => (
        key !== 'id' && key !== 'status' && key !== 'mainImg' && key !== 'countryFlag' && (
          <div key={key}>
            {key === 'Continents' ? (
              <select 
                value={value} 
                onChange={(e) => handleNewJobChange(key, e.target.value)}
              >
                <option value="">בחר יבשת</option>
                {uniqueContinents.map(continent => (
                  <option key={continent} value={continent}>{continent}</option>
                ))}
              </select>
            ) : key === 'State' ? (
              <select 
                value={value} 
                onChange={(e) => handleNewJobChange(key, e.target.value)}
              >
                <option value="">בחר מדינה</option>
                {uniqueStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            ) : key === 'Domains' ? (
              <select 
                value={value} 
                onChange={(e) => handleNewJobChange(key, e.target.value)}
              >
                <option value="">בחר תחום</option>
                {uniqueDomains.map(domain => (
                  <option key={domain} value={domain}>{domain}</option>
                ))}
              </select>
            ) : key === 'JobType' ? (
              <select 
                value={value} 
                onChange={(e) => handleNewJobChange(key, e.target.value)}
              >
                <option value="">בחר סוג משרה</option>
                {uniqueJobTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            ) : key === 'jobDescription' || key === 'requirements' || key === 'employeeTestimonials' ? (
              <textarea 
                value={value} 
                onChange={(e) => handleNewJobChange(key, e.target.value)}
                placeholder={hebrewLabels[key] || key}
              />
            ) : (
              <input 
                value={value} 
                onChange={(e) => handleNewJobChange(key, e.target.value)}
                placeholder={hebrewLabels[key] || key}
              />
            )}
          </div>
        )
      ))}
      <button onClick={addNewJob} className="mj-add-btn">הוסף משרה</button>
    </div>
  );
}

export default NewJobForm;