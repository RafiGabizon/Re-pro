import React from 'react';
import JobDetails from './JobDetails';

function JobList({ jobs, editedJobs, openJobId, handleFieldChange, saveJobChanges, approveJob, rejectJob, deleteJob, toggleJobDetails }) {
  return (
    <div className="mj-table-wrapper">
      <table className="mj-jobs-table">
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
                <p>{editedJobs[job.id]?.jobTitle || job.jobTitle}</p>
              </td>
              <td>{job.status || 'ממתין לאישור'}</td>
              <td>
                {(!job.status || job.status === 'ממתין לאישור') && (
                  <>
                    <button onClick={() => approveJob(job.id)} className="mj-approve-btn">אשר</button>
                    <button onClick={() => rejectJob(job.id)} className="mj-reject-btn">דחה</button>
                  </>
                )}
                <button onClick={() => deleteJob(job.id)} className="mj-delete-btn">מחק</button>
                <button onClick={() => toggleJobDetails(job.id)} className="mj-details-btn">
                  {openJobId === job.id ? 'הסתר' : 'הצג'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {jobs.map(job => (
        <JobDetails 
          key={job.id}
          job={job}
          isOpen={openJobId === job.id}
          handleFieldChange={handleFieldChange}
          saveJobChanges={saveJobChanges}
        />
      ))}
    </div>
  );
}

export default JobList;