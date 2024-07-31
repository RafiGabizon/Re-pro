import React, { useContext, useState, useEffect } from 'react';
import '../../styles/admin/manageHotJobs.css';
import { JobsContext } from '../../context/JobsContext';
import { TbFlame, TbFlameOff } from "react-icons/tb";


// const uniqueContinents = ['אסיה', 'אמריקה', 'אפריקה', 'אירופה', 'אוסטרליה'];
// const uniqueStates = ['ישראל', 'ארצות הברית', 'קנדה', 'בריטניה', 'גרמניה', 'צרפת', 'הודו', 'יפן', 'אוסטרליה'];
// const uniqueDomains = ['ניהול', 'טכנולוגיות מידע', 'שיווק', 'פיננסים', 'משאבי אנוש', 'עיצוב', 'הנדסה', 'מכירות', 'ייעוץ'];
// const uniqueJobTypes = ['חצי משרה', 'משרה מלאה', 'משרת אם'];

function ManageHotJobs() {
  const { jobs, updateJobs } = useContext(JobsContext);
  // const [editedJobs, setEditedJobs] = useState({});
  // const [openJobId, setOpenJobId] = useState(null);
  const [hotJobs, setHotJobs] = useState([]);

  useEffect(() => {
    // Filter only approved jobs
    setHotJobs(jobs.filter(job => job.status === 'מאושר'));
  }, [jobs]);

  const toggleHotJob = (job) => {
    const updatedJobs = jobs.map(j => 
      j.id === job.id ? { ...j, isHot: !j.isHot } : j
    );
    updateJobs(updatedJobs);
  };

  // const handleFieldChange = (id, field, value) => {
  //   setEditedJobs(prevState => ({
  //     ...prevState,
  //     [id]: {
  //       ...prevState[id],
  //       [field]: value
  //     }
  //   }));
  // };

  // const saveJobChanges = (id) => {
  //   const updatedJob = editedJobs[id];
  //   if (updatedJob) {
  //     const {
  //       jobTitle = '',
  //       Continents = '',
  //       State = '',
  //       Domains = '',
  //       JobType = '',
  //       Salary = '',
  //       mainImg = ''
  //     } = updatedJob;
      
  //     if (
  //       jobTitle.trim() !== '' &&
  //       Continents.trim() !== '' &&
  //       State.trim() !== '' &&
  //       Domains.trim() !== '' &&
  //       JobType.trim() !== '' &&
  //       Salary.trim() !== '' &&
  //       mainImg.trim() !== ''
  //     ) {
  //       updateJobs(jobs.map(job => 
  //         job.id === id ? { ...job, ...updatedJob } : job
  //       ));
  //       setEditedJobs(prevState => {
  //         const newState = { ...prevState };
  //         delete newState[id];
  //         return newState;
  //       });
  //       alert('המשרה נשמרה בהצלחה');
  //     } else {
  //       alert('לא ניתן לשמור משרה עם שדות ריקים.');
  //     }
  //   }
  // };

  // const toggleJobDetails = (id) => {
  //   setOpenJobId(openJobId === id ? null : id);
  // };

  return (
    <div className="hot-jobs-manager">
      <h3>ניהול משרות חמות</h3>
      <table className="hot-jobs-table">
        <thead>
          <tr>
            <th>תפקיד</th>
            <th>יבשת</th>
            <th>מדינה</th>
            <th>תחום</th>
            <th>סוג משרה</th>
            <th>שכר</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {hotJobs.map(job => (
            <tr key={job.id}>
              <td>{job.jobTitle}</td>
              <td>{job.Continents}</td>
              <td>{job.State}</td>
              <td>{job.Domains}</td>
              <td>{job.JobType}</td>
              <td>{job.Salary}</td>
              <td>
                <button onClick={() => toggleHotJob(job)} className={job.isHot ? "remove-hot-job-btn" : "add-hot-job-btn"}>
                  {job.isHot ? <TbFlameOff /> : <TbFlame />}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageHotJobs;