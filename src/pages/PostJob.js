import React, { useState, useContext } from 'react';
import '../styles/postjob.css';
import { JobsContext } from '../context/JobsContext';

const uniqueContinents = ['אסיה', 'אמריקה', 'אפריקה', 'אירופה', 'אוסטרליה'];
const uniqueStates = ['ישראל', 'ארצות הברית', 'קנדה', 'בריטניה', 'גרמניה', 'צרפת', 'הודו', 'יפן', 'אוסטרליה'];
const uniqueDomains = ['ניהול', 'טכנולוגיות מידע', 'שיווק', 'פיננסים', 'משאבי אנוש', 'עיצוב', 'הנדסה', 'מכירות', 'ייעוץ'];
const uniqueJobTypes = ['חצי משרה', 'משרה מלאה', 'משרת אם'];

export default function PostJob() {
  const { jobs, updateJobs } = useContext(JobsContext);
  const [newJob, setNewJob] = useState({
    jobTitle: '',
    Continents: '',
    State: '',
    Domains: '',
    JobType: '',
    Salary: '',
    jobDescription: '',
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
        countryFlag: "https://via.placeholder.com/30"
      };
      updateJobs([...jobs, jobToAdd]);
      alert('המשרה נשלחה לאישור המנהל');
      setNewJob({
        jobTitle: '',
        Continents: '',
        State: '',
        Domains: '',
        JobType: '',
        Salary: '',
        jobDescription: '',
        status: 'ממתין לאישור'
      });
    } else {
      alert('נא למלא את כל השדות הנדרשים');
    }
  };

  return (
    <div className="post-job-page">
      <h1>פרסום משרה חדשה</h1>
      
      <div className="job-form">
        <input 
          value={newJob.jobTitle} 
          onChange={(e) => handleNewJobChange('jobTitle', e.target.value)}
          placeholder="כותרת המשרה"
        />
        <select 
          value={newJob.Continents} 
          onChange={(e) => handleNewJobChange('Continents', e.target.value)}
        >
          <option value="">בחר יבשת</option>
          {uniqueContinents.map(continent => (
            <option key={continent} value={continent}>{continent}</option>
          ))}
        </select>
        <select 
          value={newJob.State} 
          onChange={(e) => handleNewJobChange('State', e.target.value)}
        >
          <option value="">בחר מדינה</option>
          {uniqueStates.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
        <select 
          value={newJob.Domains} 
          onChange={(e) => handleNewJobChange('Domains', e.target.value)}
        >
          <option value="">בחר תחום</option>
          {uniqueDomains.map(domain => (
            <option key={domain} value={domain}>{domain}</option>
          ))}
        </select>
        <select 
          value={newJob.JobType} 
          onChange={(e) => handleNewJobChange('JobType', e.target.value)}
        >
          <option value="">בחר סוג משרה</option>
          {uniqueJobTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <input 
          value={newJob.Salary} 
          onChange={(e) => handleNewJobChange('Salary', e.target.value)}
          placeholder="שכר"
        />
        <textarea 
          value={newJob.jobDescription} 
          onChange={(e) => handleNewJobChange('jobDescription', e.target.value)}
          placeholder="תיאור המשרה"
        />
        <button onClick={addNewJob} className="submit-job-btn">שלח משרה לאישור</button>
      </div>

      <div className="about-section">
        <h2>איך זה עובד?</h2>
        <p>לאחר שליחת המשרה, היא תועבר לאישור המנהל במערכת. ברגע שהמשרה תאושר, היא תפורסם באתר ותהיה זמינה למועמדים פוטנציאליים.</p>
      </div>
    </div>
  );
}