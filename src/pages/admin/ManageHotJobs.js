import React, { useContext, useState } from 'react';
import '../../styles/admin/manageHotJobs.css';
import { JobsContext } from '../../context/JobsContext';

const uniqueContinents = ['אסיה', 'אמריקה', 'אפריקה', 'אירופה', 'אוסטרליה'];
const uniqueStates = ['ישראל', 'ארצות הברית', 'קנדה', 'בריטניה', 'גרמניה', 'צרפת', 'הודו', 'יפן', 'אוסטרליה'];
const uniqueDomains = ['ניהול', 'טכנולוגיות מידע', 'שיווק', 'פיננסים', 'משאבי אנוש', 'עיצוב', 'הנדסה', 'מכירות', 'ייעוץ'];
const uniqueJobTypes = ['חצי משרה', 'משרה מלאה', 'משרת אם'];

function ManageHotJobs() {
  const { jobs, updateJobs } = useContext(JobsContext);
  const [editedJobs, setEditedJobs] = useState({});
  const [openJobId, setOpenJobId] = useState(null);

  const addHotJob = () => {
    const newJob = {
      id: Date.now(),
      mainImg: "https://via.placeholder.com/150",
      Continents: "יבשת חדשה",
      State: "מדינה חדשה",
      countryFlag: "https://via.placeholder.com/30",
      Domains: "תחום חדש",
      JobType: "סוג משרה חדש",
      Salary: "",
      jobTitle: "",
      jobDescription: "תיאור משרה חדש",
    };
    updateJobs([...jobs, newJob]);
  };

  const removeHotJob = (id) => {
    updateJobs(jobs.filter(job => job.id !== id));
    alert('המשרה נמחקה בהצלחה');
  };

  const handleFieldChange = (id, field, value) => {
    setEditedJobs(prevState => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [field]: value
      }
    }));
  };

const saveJobChanges = (id) => {
  const updatedJob = editedJobs[id];
  if (updatedJob) {
    // Set default empty strings for all fields if they are undefined
    const {
      jobTitle = '',
      Continents = '',
      State = '',
      Domains = '',
      JobType = '',
      Salary = ''
    } = updatedJob;
    
    // Check if any required field is empty and prevent saving if so
    if (
      jobTitle.trim() !== '' &&
      Continents.trim() !== '' &&
      State.trim() !== '' &&
      Domains.trim() !== '' &&
      JobType.trim() !== '' &&
      Salary.trim() !== ''
    ) {
      updateJobs(jobs.map(job => 
        job.id === id ? { ...job, ...updatedJob } : job
      ));
      setEditedJobs(prevState => {
        const newState = { ...prevState };
        delete newState[id];
        return newState;
      });
      alert('המשרה נשמרה בהצלחה');
    } else {
      alert('לא ניתן לשמור משרה עם שדות ריקים.');
    }
  }
};

  const toggleJobDetails = (id) => {
    setOpenJobId(openJobId === id ? null : id);
  };

  return (
    <div className="hot-jobs-manager">
      <h1>ניהול משרות</h1>
      <button onClick={addHotJob} className="add-job-btn">הוסף משרה חדשה</button>
      <table className="jobs-table">
        <thead>
          <tr>
            <th>תפקיד</th>
            <th>יבשת</th>
            <th>מדינה</th>
            <th>תחום</th>
            <th>סוג משרה</th>
            <th>שכר</th>
            <th>תמונה ראשית</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(job => (
            <tr key={job.id}>
              <td>
                <input 
                  value={editedJobs[job.id]?.jobTitle || job.jobTitle} 
                  placeholder='תפקיד'
                  required
                  onChange={(e) => handleFieldChange(job.id, 'jobTitle', e.target.value)}
                />
              </td>
              <td>
                <select 
                  value={editedJobs[job.id]?.Continents || job.Continents} 
                  onChange={(e) => handleFieldChange(job.id, 'Continents', e.target.value)}
                >
                  {uniqueContinents.map(continent => (
                    <option key={continent} value={continent}>{continent}</option>
                  ))}
                </select>
              </td>
              <td>
                <select 
                  value={editedJobs[job.id]?.State || job.State} 
                  onChange={(e) => handleFieldChange(job.id, 'State', e.target.value)}
                >
                  {uniqueStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </td>
              <td>
                <select 
                  value={editedJobs[job.id]?.Domains || job.Domains} 
                  onChange={(e) => handleFieldChange(job.id, 'Domains', e.target.value)}
                >
                  {uniqueDomains.map(domain => (
                    <option key={domain} value={domain}>{domain}</option>
                  ))}
                </select>
              </td>
              <td>
                <select 
                  value={editedJobs[job.id]?.JobType || job.JobType} 
                  onChange={(e) => handleFieldChange(job.id, 'JobType', e.target.value)}
                >
                  {uniqueJobTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </td>
              <td>
                <input 
                  value={editedJobs[job.id]?.Salary || job.Salary} 
                  placeholder='גובה שכר'
                  required
                  onChange={(e) => handleFieldChange(job.id, 'Salary', e.target.value)}
                />
              </td>
              <td>
                <input 
                  value={editedJobs[job.id]?.mainImg || job.mainImg} 
                  onChange={(e) => handleFieldChange(job.id, 'mainImg', e.target.value)}
                  placeholder="כתובת תמונה"
                />
              </td>
              <td>
                <button onClick={() => saveJobChanges(job.id)} className="save-job-btn">שמור</button>
                <button onClick={() => removeHotJob(job.id)} className="remove-job-btn">הסר</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {jobs.map(job => (
        <div key={job.id} className={`job-card ${openJobId === job.id ? 'open' : ''}`}>
          <div className="job-header" onClick={() => toggleJobDetails(job.id)}>
            <div>
              <h2>{job.jobTitle}</h2>
              <p>{job.State}</p>
            </div>
            <span className="expand-icon">{openJobId === job.id ? '▲' : '▼'}</span>
          </div>
          <div className="job-details">
            <input 
              value={editedJobs[job.id]?.jobTitle || job.jobTitle} 
              onChange={(e) => handleFieldChange(job.id, 'jobTitle', e.target.value)}
            />
            <select 
              value={editedJobs[job.id]?.Continents || job.Continents} 
              onChange={(e) => handleFieldChange(job.id, 'Continents', e.target.value)}
            >
              {uniqueContinents.map(continent => (
                <option key={continent} value={continent}>{continent}</option>
              ))}
            </select>
            <select 
              value={editedJobs[job.id]?.State || job.State} 
              onChange={(e) => handleFieldChange(job.id, 'State', e.target.value)}
            >
              {uniqueStates.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            <select 
              value={editedJobs[job.id]?.Domains || job.Domains} 
              onChange={(e) => handleFieldChange(job.id, 'Domains', e.target.value)}
            >
              {uniqueDomains.map(domain => (
                <option key={domain} value={domain}>{domain}</option>
              ))}
            </select>
            <select 
              value={editedJobs[job.id]?.JobType || job.JobType} 
              onChange={(e) => handleFieldChange(job.id, 'JobType', e.target.value)}
            >
              {uniqueJobTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <input 
              value={editedJobs[job.id]?.Salary || job.Salary} 
              onChange={(e) => handleFieldChange(job.id, 'Salary', e.target.value)}
            />
            <input 
              value={editedJobs[job.id]?.mainImg || job.mainImg} 
              onChange={(e) => handleFieldChange(job.id, 'mainImg', e.target.value)}
            />
            <textarea 
              value={editedJobs[job.id]?.jobDescription || job.jobDescription} 
              onChange={(e) => handleFieldChange(job.id, 'jobDescription', e.target.value)}
            />
            <button onClick={() => saveJobChanges(job.id)} className="save-job-btn">שמור</button>
            <button onClick={() => removeHotJob(job.id)} className="remove-job-btn">הסר</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ManageHotJobs;
