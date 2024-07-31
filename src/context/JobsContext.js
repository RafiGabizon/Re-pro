// JobsContext.js
import React, { createContext, useState, useEffect } from 'react';
import { jobs_ar } from "../data/jobs";

export const JobsContext = createContext();

export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const savedJobs = localStorage.getItem('hotJobs');
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    } else {
      setJobs(jobs_ar);
    }
  }, []);

  const updateJobs = (newJobs) => {
    setJobs(newJobs);
    localStorage.setItem('hotJobs', JSON.stringify(newJobs));
  };

  return (
    <JobsContext.Provider value={{ jobs, updateJobs }}>
      {children}
    </JobsContext.Provider>
  );
};