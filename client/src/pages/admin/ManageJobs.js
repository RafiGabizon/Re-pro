// Importing necessary dependencies
import React, { useContext, useState } from 'react'; // Import React and hooks for state and context management
import { JobsContext } from '../../context/JobsContext'; // Import JobsContext for accessing jobs data
// import NewJobForm from '../../Components/admin/NewJobForm'; // Import component for creating new jobs
import JobList from '../../Components/admin/JobList'; // Import component for desktop job list view
import MobileJobList from '../../Components/admin/MobileJobList'; // Import component for mobile job list view
import '../../styles/admin/manageJobs.css'; // Import CSS for styling the component

// Functional component for managing and approving jobs
function ManageJobs() {
  const { jobs, updateJobs } = useContext(JobsContext); // Access jobs and updater function from JobsContext
  const [editedJobs, setEditedJobs] = useState({}); // State for tracking edits to jobs
  const [openJobId, setOpenJobId] = useState(null); // State for tracking expanded job details
  const [viewMode, setViewMode] = useState('all'); // State for filtering jobs by status

  // Handle field changes for editing a job
  const handleFieldChange = (id, field, value) => {
    setEditedJobs(prevState => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [field]: value
      }
    }));
  };

  // Save changes made to a job
  const saveJobChanges = (updatedJob) => {
    if (!validateJobData(updatedJob)) {
      alert('אנא מלא את כל השדות הנדרשים');
      return;
    }

    const newJobs = jobs.map(job => 
      job.id === updatedJob.id ? { ...updatedJob, lastModified: Date.now() } : job
    );
    updateJobs(newJobs);
    alert('המשרה עודכנה בהצלחה');
  };

  // Validate job data before saving or approving
  const validateJobData = (job) => {
    const requiredFields = [
      'jobTitle',
      'companyName',
      'jobType',
      'state',
      'city',
      'minCommitment',
      'description',
      'visaType',
      'flightType',
      'accommodationType',
      'salaryType'
    ];

    return requiredFields.every(field => job[field] && job[field].trim() !== '');
  };

  // Approve a job
  const approveJob = (id) => {
    const jobToApprove = jobs.find(job => job.id === id);
    if (!validateJobData(jobToApprove)) {
      alert('לא ניתן לאשר משרה - חסרים פרטים חיוניים');
      return;
    }

    const newJobs = jobs.map(job => 
      job.id === id ? { 
        ...job, 
        status: 'מאושר',
        approvalDate: Date.now(),
        lastModified: Date.now()
      } : job
    );
    updateJobs(newJobs);
    alert('המשרה אושרה בהצלחה ותפורסם באתר');
  };

  // Reject a job
  const rejectJob = (id, reason = '') => {
    const newJobs = jobs.map(job => 
      job.id === id ? { 
        ...job, 
        status: 'נדחה',
        rejectionReason: reason,
        rejectionDate: Date.now(),
        lastModified: Date.now()
      } : job
    );
    updateJobs(newJobs);
    alert('המשרה נדחתה');
  };

  // Delete a job
  const deleteJob = (id) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק משרה זו?')) {
      const newJobs = jobs.filter(job => job.id !== id);
      updateJobs(newJobs);
      alert('המשרה נמחקה בהצלחה');
    }
  };

  // Toggle the expansion of job details
  const toggleJobDetails = (id) => {
    setOpenJobId(openJobId === id ? null : id);
  };

  // Filter jobs based on the selected view mode
  const getFilteredJobs = () => {
    switch (viewMode) {
      case 'pending':
        return jobs.filter(job => job.status === 'ממתין לאישור');
      case 'approved':
        return jobs.filter(job => job.status === 'מאושר');
      case 'rejected':
        return jobs.filter(job => job.status === 'נדחה');
      default:
        return jobs;
    }
  };

  return (
    <div className="mj-container">
      <h1 className="mj-title">ניהול ואישור משרות</h1>

      {/* Filters for job status */}
      <div className="mj-filters">
        <button 
          className={`filter-btn ${viewMode === 'all' ? 'active' : ''}`}
          onClick={() => setViewMode('all')}
        >
          כל המשרות
        </button>
        <button 
          className={`filter-btn ${viewMode === 'pending' ? 'active' : ''}`}
          onClick={() => setViewMode('pending')}
        >
          ממתינות לאישור
        </button>
        <button 
          className={`filter-btn ${viewMode === 'approved' ? 'active' : ''}`}
          onClick={() => setViewMode('approved')}
        >
          מאושרות
        </button>
        <button 
          className={`filter-btn ${viewMode === 'rejected' ? 'active' : ''}`}
          onClick={() => setViewMode('rejected')}
        >
          נדחו
        </button>
      </div>

      {/* Desktop job list view */}
      <div className="desktop-view">
        <JobList 
          jobs={getFilteredJobs()}
          editedJobs={editedJobs}
          openJobId={openJobId}
          handleFieldChange={handleFieldChange}
          saveJobChanges={saveJobChanges}
          approveJob={approveJob}
          rejectJob={rejectJob}
          deleteJob={deleteJob}
          toggleJobDetails={toggleJobDetails}
        />
      </div>

      {/* Mobile job list view */}
      <div className="mobile-view">
        <MobileJobList 
          jobs={getFilteredJobs()}
          editedJobs={editedJobs}
          openJobId={openJobId}
          handleFieldChange={handleFieldChange}
          saveJobChanges={saveJobChanges}
          approveJob={approveJob}
          rejectJob={rejectJob}
          deleteJob={deleteJob}
          toggleJobDetails={toggleJobDetails}
        />
      </div>
    </div>
  );
}

export default ManageJobs; // Export the component for use in other parts of the application
