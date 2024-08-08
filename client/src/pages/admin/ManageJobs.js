import React, { useContext, useState } from 'react';
import { JobsContext } from '../../context/JobsContext';
import NewJobForm from '../../Components/admin/NewJobForm';
import JobList from '../../Components/admin/JobList';
import MobileJobList from '../../Components/admin/MobileJobList';
import '../../styles/admin/manageJobs.css';

function ManageJobs() {
  const { jobs, updateJobs } = useContext(JobsContext);
  const [editedJobs, setEditedJobs] = useState({});
  const [openJobId, setOpenJobId] = useState(null);

  const handleFieldChange = (id, field, value) => {
  setEditedJobs(prevState => ({
    ...prevState,
    [id]: {
      ...prevState[id],
      [field]: value
    }
  }));
};

const saveJobChanges = (updatedJob) => {
    const newJobs = jobs.map(job => 
      job.id === updatedJob.id ? updatedJob : job
    );
    updateJobs(newJobs);
    alert('המשרה עודכנה בהצלחה');
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
    <div className="mj-container">
      <h1 className="mj-title">ניהול ואישור משרות</h1>
      
      <NewJobForm updateJobs={updateJobs} />
      
      <h2 className="mj-subtitle">משרות קיימות</h2>
      <JobList 
        jobs={jobs}
        editedJobs={editedJobs}
        openJobId={openJobId}
        handleFieldChange={handleFieldChange}
        saveJobChanges={saveJobChanges}
        approveJob={approveJob}
        rejectJob={rejectJob}
        deleteJob={deleteJob}
        toggleJobDetails={toggleJobDetails}
      />
      
      <MobileJobList 
        jobs={jobs}
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
  );
}

export default ManageJobs;