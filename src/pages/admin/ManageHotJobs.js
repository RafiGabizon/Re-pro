import React, {useContext, useState} from 'react';
import '../../styles/admin/manageHotJobs.css';
import { JobsContext } from '../../context/JobsContext';


const uniqueContinents = ['אסיה', 'אמריקה', 'אפריקה', 'אירופה', 'אוסטרליה'];
const uniqueStates = ['ישראל', 'ארצות הברית', 'קנדה', 'בריטניה', 'גרמניה', 'צרפת', 'הודו', 'יפן', 'אוסטרליה'];
const uniqueDomains = [ 'ניהול', 'טכנולוגיות מידע', 'שיווק', 'פיננסים', 'משאבי אנוש', 'עיצוב', 'הנדסה', 'מכירות', 'ייעוץ'];
const uniqueJobTypes = ['חצי משרה', 'משרה מלאה', 'משרת אם'];


function ManageHotJobs() {
  const { jobs, updateJobs } = useContext(JobsContext);
  const [editedJobs, setEditedJobs] = useState({});

  const addHotJob = () => {
    const newJob = {
      id: Date.now(),
      mainImg: "https://via.placeholder.com/150",
      Continents: "יבשת חדשה",
      State: "מדינה חדשה",
      countryFlag: "https://via.placeholder.com/30",
      Domains: "תחום חדש",
      JobType: "סוג משרה חדש",
      Salary: "שכר חדש",
      jobTitle: "תפקיד חדש",
      jobDescription: "תיאור משרה חדש",
    };
    updateJobs([...jobs, newJob]);
  };

  const removeHotJob = (id) => {
    updateJobs(jobs.filter(job => job.id !== id));
  };

    // פונקציה לעדכון המצב הזמני בשדה מסויים
  const handleFieldChange = (id, field, value) => {
    setEditedJobs(prevState => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [field]: value
      }
    }));
  };

    // פונקציה לשמירת השינויים במצב הקבוע
  const saveJobChanges = (id) => {
    const updatedJob = editedJobs[id];
    if (updatedJob) {
      updateJobs(jobs.map(job => 
        job.id === id ? { ...job, ...updatedJob } : job
      ));
      // מחיקת השינויים הזמניים לאחר שמירה
      setEditedJobs(prevState => {
        const newState = { ...prevState };
        delete newState[id];
        return newState;
      });
    }
  };


  return (
    <div className="manage-hot-jobs">
      <h1>ניהול משרות</h1>
      <button onClick={addHotJob} className="add-btn">הוסף משרה חדשה</button>
      <table className="hot-jobs-table">
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
                {/* כפתור לשמירת השינויים */}
                <button onClick={() => saveJobChanges(job.id)} className="save-btn">שמור</button>
                <button onClick={() => removeHotJob(job.id)} className="remove-btn">הסר</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageHotJobs;