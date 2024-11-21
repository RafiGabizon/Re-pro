// Importing necessary dependencies
import React, { createContext, useState, useEffect } from 'react'; // Import React and hooks for context, state, and lifecycle management
import { jobs_ar } from "../data/jobs"; // Import the jobs data from the external file

// Create a context for the jobs data
export const JobsContext = createContext(); // Export the JobsContext for use in other components

// Provider component for the JobsContext
export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]); // State to store the list of jobs

  // Load initial jobs data from localStorage or fallback to predefined data
  useEffect(() => {
    const savedJobs = localStorage.getItem('hotJobs'); // Check if there are saved jobs in localStorage
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs)); // Load jobs from localStorage if available
    } else {
      setJobs(jobs_ar); // Otherwise, use the predefined jobs data
    }
  }, []);

  // Function to update the list of jobs
  const updateJobs = (newJobs) => {
    setJobs(newJobs); // Update the state with the new jobs list
    localStorage.setItem('hotJobs', JSON.stringify(newJobs)); // Save the updated jobs list to localStorage
  };

  return (
    // Provide the jobs data and updater function to the context consumers
    <JobsContext.Provider value={{ jobs, updateJobs }}>
      {children} {/* Render the children components that will consume the context */}
    </JobsContext.Provider>
  );
};
