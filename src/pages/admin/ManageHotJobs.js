import React, { useState } from 'react';
import '../../styles/admin/manageHotJobs.css';

function ManageHotJobs() {
  const [hotJobs, setHotJobs] = useState([
    { id: 1, title: 'מהנדס תוכנה בכיר', company: 'חברת הייטק א' },
    { id: 2, title: 'מנהל מוצר', company: 'סטארטאפ ב' },
  ]);

  const addHotJob = () => {
    const newJob = { id: Date.now(), title: 'משרה חדשה', company: 'חברה חדשה' };
    setHotJobs([...hotJobs, newJob]);
  };

  const removeHotJob = (id) => {
    setHotJobs(hotJobs.filter(job => job.id !== id));
  };

  return (
    <div className="manage-hot-jobs">
      <h1>ניהול משרות חמות</h1>
      <button onClick={addHotJob} className="add-btn">הוסף משרה חמה</button>
      <table className="hot-jobs-table">
        <thead>
          <tr>
            <th>כותרת משרה</th>
            <th>חברה</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {hotJobs.map(job => (
            <tr key={job.id}>
              <td>{job.title}</td>
              <td>{job.company}</td>
              <td>
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