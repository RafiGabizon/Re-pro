import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobs_ar as jobs } from '../data/jobs';

export default function JobDetails() {
  const { jobId } = useParams();
  const navigate = useNavigate();  // Import useNavigate and call it here

  // Convert jobId to a number and find the job
  const job = jobs.find((job) => job.id === parseInt(jobId, 10));  // Convert jobId to a number

  // Debugging output
  console.log('Job ID:', jobId);
  console.log('Found Job:', job);

  if (!job) {
    return (
      <div className="JobDetails">
        <h2>Job Not Found</h2>
        <p>Sorry, we couldn’t find the job you were looking for.</p>
        <button onClick={() => navigate('/')}>Go to Home</button>
      </div>
    );
  }

  return (
    <div className="JobDetails">
      <h2>{job.jobTitle}</h2>
      <img src={job.mainImg} alt={job.jobTitle} className="main-img" />
      <p>{job.jobDescription}</p>
      <p><strong>Continents:</strong> {job.Continents}</p>
      <p><strong>State:</strong> {job.State}</p>
      <p><strong>Domains:</strong> {job.Domains}</p>
      <p><strong>Job Type:</strong> {job.JobType}</p>
      <p><strong>Salary:</strong> {job.Salary}</p>
    </div>
  );
}
