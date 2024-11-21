// Importing necessary dependencies and components
import React from 'react'; // Import React to enable JSX syntax
import JobDetails from './JobDetails'; // Import the JobDetails component for rendering job details

// Functional component for rendering the list of jobs and related actions
function JobList({ 
  jobs, // Array of jobs to display
  editedJobs, // Object containing locally edited job data
  openJobId, // ID of the job currently expanded to show details
  handleFieldChange, // Function to handle field changes
  saveJobChanges, // Function to save changes to a job
  approveJob, // Function to approve a job
  rejectJob, // Function to reject a job
  deleteJob, // Function to delete a job
  toggleJobDetails // Function to toggle job details visibility
}) {
  return (
    <div className="mj-table-wrapper">
      {/* Table displaying the list of jobs */}
      <table className="mj-jobs-table">
        <thead>
          <tr>
            <th>כותרת משרה</th> {/* Job title column */}
            <th>סטטוס</th> {/* Job status column */}
            <th>פעולות</th> {/* Actions column */}
          </tr>
        </thead>
        <tbody>
          {jobs.map(job => (
            <tr key={job.id}>
              <td>
                {/* Display the job title, with priority for edited title if available */}
                <p>{editedJobs[job.id]?.jobTitle || job.jobTitle}</p>
              </td>
              <td>{job.status || 'ממתין לאישור'}</td> {/* Display the job status */}
              <td>
                {/* Display action buttons for jobs awaiting approval */}
                {(!job.status || job.status === 'ממתין לאישור') && (
                  <>
                    <button onClick={() => approveJob(job.id)} className="mj-approve-btn">אשר</button> {/* Approve button */}
                    <button onClick={() => rejectJob(job.id)} className="mj-reject-btn">דחה</button> {/* Reject button */}
                  </>
                )}
                <button onClick={() => deleteJob(job.id)} className="mj-delete-btn">מחק</button> {/* Delete button */}
                <button onClick={() => toggleJobDetails(job.id)} className="mj-details-btn">
                  {/* Toggle job details visibility */}
                  {openJobId === job.id ? 'הסתר' : 'הצג'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Render JobDetails component for each job */}
      {jobs.map(job => (
        <JobDetails 
          key={job.id}
          job={job}
          isOpen={openJobId === job.id} // Determine if the details for this job should be displayed
          handleFieldChange={handleFieldChange} // Pass the field change handler
          saveJobChanges={saveJobChanges} // Pass the save changes handler
        />
      ))}
    </div>
  );
}

export default JobList;
