import React, { useState } from 'react';
import '../../styles/admin/manageJobs.css';

function ManageJobs() {
  const [jobs, setJobs] = useState([
    { id: 1, title: 'מפתח Full Stack', status: 'ממתין לאישור' },
    { id: 2, title: 'מעצב UX/UI', status: 'מאושר' },
  ]);

  const approveJob = (id) => {
    setJobs(jobs.map(job => 
      job.id === id ? { ...job, status: 'מאושר' } : job
    ));
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  return (
    <div className="manage-jobs">
      <h1>ניהול ואישור משרות</h1>
      <table className="jobs-table">
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
              <td>{job.title}</td>
              <td>{job.status}</td>
              <td>
                {job.status !== 'מאושר' && (
                  <button onClick={() => approveJob(job.id)} className="approve-btn">אשר</button>
                )}
                <button onClick={() => deleteJob(job.id)} className="delete-btn">מחק</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageJobs;