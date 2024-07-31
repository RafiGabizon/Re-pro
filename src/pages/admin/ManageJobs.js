import React, { useContext, useState } from 'react';
import '../../styles/admin/manageJobs.css';
import { JobsContext } from '../../context/JobsContext';

const uniqueContinents = ['אסיה', 'אמריקה', 'אפריקה', 'אירופה', 'אוסטרליה'];
const uniqueStates = ['ישראל', 'ארצות הברית', 'קנדה', 'בריטניה', 'גרמניה', 'צרפת', 'הודו', 'יפן', 'אוסטרליה'];
const uniqueDomains = [ 'ניהול', 'טכנולוגיות מידע', 'שיווק', 'פיננסים', 'משאבי אנוש', 'עיצוב', 'הנדסה', 'מכירות', 'ייעוץ'];
const uniqueJobTypes = ['חצי משרה', 'משרה מלאה', 'משרת אם'];

function ManageJobs() {
  const { jobs, updateJobs } = useContext(JobsContext);
  const [editedJobs, setEditedJobs] = useState({});
  const [openJobId, setOpenJobId] = useState(null);
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

  const handleFieldChange = (id, field, value) => {
    setEditedJobs(prevState => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [field]: value
      }
    }));
  };

  const handleNewJobChange = (field, value) => {
    setNewJob(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const saveJobChanges = (id) => {
    const updatedJob = editedJobs[id];
    if (updatedJob) {
      const newJobs = jobs.map(job => 
        job.id === id ? { ...job, ...updatedJob } : job
      );
      updateJobs(newJobs);
      setEditedJobs(prevState => {
        const newState = { ...prevState };
        delete newState[id];
        return newState;
      });
      alert('המשרה עודכנה בהצלחה');
    }
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
      alert('המשרה החדשה נוספה בהצלחה');
    } else {
      alert('נא למלא את כל השדות הנדרשים');
    }
  };

  const approveJob = (id) => {
    const newJobs = jobs.map(job => 
      job.id === id ? { ...job, status: 'מאושר' } : job
    );
    updateJobs(newJobs);
    alert('המשרה אושרה בהצלחה');
  };

  const rejectJob = (id) => {
    const newJobs = jobs.map(job => 
      job.id === id ? { ...job, status: 'נדחה' } : job
    );
    updateJobs(newJobs);
    alert('המשרה נדחתה');
  };

  const deleteJob = (id) => {
    const newJobs = jobs.filter(job => job.id !== id);
    updateJobs(newJobs);
    alert('המשרה נמחקה בהצלחה');
  };

  const toggleJobDetails = (id) => {
    setOpenJobId(openJobId === id ? null : id);
  };

  return (
    <div className="jobs-manager">
      <h1>ניהול ואישור משרות</h1>
      
      <h2>הוסף משרה חדשה</h2>
      <div className="new-job-form">
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
        <button onClick={addNewJob} className="add-job-btn">הוסף משרה</button>
      </div>

      <h2>משרות קיימות</h2>
      <div className="jobs-table-wrapper">
        <table className="existe-jobs-table">
          <thead>
            <tr>
              <th>כותרת משרה</th>
              <th>סטטוס</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(job => (
              <tr key={job.id}>
                <td>
                  <input 
                    value={editedJobs[job.id]?.jobTitle || job.jobTitle} 
                    onChange={(e) => handleFieldChange(job.id, 'jobTitle', e.target.value)}
                  />
                </td>
                <td>{job.status || 'ממתין לאישור'}</td>
                <td>
                  {(!job.status || job.status === 'ממתין לאישור') && (
                    <>
                      <button onClick={() => approveJob(job.id)} className="approve-btn">אשר</button>
                      <button onClick={() => rejectJob(job.id)} className="reject-btn">דחה</button>
                    </>
                  )}
                  <button onClick={() => deleteJob(job.id)} className="delete-btn">מחק</button>
                  <button onClick={() => toggleJobDetails(job.id)} className="details-btn">
                    {openJobId === job.id ? 'הסתר' : 'הצג'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {jobs.map(job => (
        <div key={job.id} className={`job-details ${openJobId === job.id ? 'open' : ''}`}>
          <h2>{job.jobTitle}</h2>
          <p>סטטוס: {job.status || 'ממתין לאישור'}</p>
          <p>יבשת: {job.Continents}</p>
          <p>מדינה: {job.State}</p>
          <p>תחום: {job.Domains}</p>
          <p>סוג משרה: {job.JobType}</p>
          <p>שכר: {job.Salary}</p>
          <textarea 
            value={editedJobs[job.id]?.jobDescription || job.jobDescription} 
            onChange={(e) => handleFieldChange(job.id, 'jobDescription', e.target.value)}
            placeholder="תיאור המשרה"
          />
          <button onClick={() => saveJobChanges(job.id)} className="save-job-btn">שמור שינויים</button>
        </div>
      ))}
    </div>
  );
}

export default ManageJobs;