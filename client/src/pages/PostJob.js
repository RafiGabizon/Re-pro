// PostJob.js - Main Component for Job Posting
// This component handles the multi-step form for posting a new job. It uses context for managing jobs and state for form progress.

import React, { useState, useContext } from 'react';
import { JobsContext } from '../context/JobsContext'; // Context for managing job data
import PostJobStep1 from '../Components/PostJobStep1'; // Step 1 Component
import PostJobStep2 from '../Components/PostJobStep2'; // Step 2 Component
import PostJobStep3 from '../Components/PostJobStep3'; // Step 3 Component

export default function PostJob() {
  const { jobs, updateJobs } = useContext(JobsContext); // Access jobs context
  const [currentStep, setCurrentStep] = useState(1); // Tracks the current step in the form
  const [formData, setFormData] = useState({
    // Step 1 fields
    jobTitle: '',
    companyName: '',
    jobType: '',
    state: '',
    city: '',
    minCommitment: '',
    description: '',
    additionalRequirements: '',
    showAdditionalReq: false,
    // Step 2 fields
    visaType: '',
    flightType: '',
    accommodationType: '',
    salaryType: '',
    salaryAmount: '',
    // Step 3 fields
    mainImage: '',
    videoUrl: '',
    environmentImages: [],
    status: 'ממתין לאישור' // Default job status
  });

  // Move to the next step
  const handleNext = () => {
    setCurrentStep(prevStep => prevStep + 1);
  };

  // Move back to the previous step
  const handleBack = () => {
    setCurrentStep(prevStep => prevStep - 1);
  };

  // Reset the form and return to step 1
  const handleComplete = () => {
    setCurrentStep(1);
    setFormData({
      jobTitle: '',
      companyName: '',
      jobType: '',
      state: '',
      city: '',
      minCommitment: '',
      description: '',
      additionalRequirements: '',
      showAdditionalReq: false,
      visaType: '',
      flightType: '',
      accommodationType: '',
      salaryType: '',
      salaryAmount: '',
      mainImage: '',
      videoUrl: '',
      environmentImages: [],
      status: 'ממתין לאישור'
    });
  };

  // Render the current step of the form
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PostJobStep1
            formData={formData} // Pass form data
            setFormData={setFormData} // Update form data
            onNext={handleNext} // Proceed to step 2
          />
        );
      case 2:
        return (
          <PostJobStep2
            formData={formData} // Pass form data
            setFormData={setFormData} // Update form data
            onNext={handleNext} // Proceed to step 3
            onBack={handleBack} // Return to step 1
          />
        );
      case 3:
        return (
          <PostJobStep3
            formData={formData} // Pass form data
            setFormData={setFormData} // Update form data
            onBack={handleBack} // Return to step 2
            jobs={jobs} // Access existing jobs
            updateJobs={updateJobs} // Update the jobs list
            onComplete={handleComplete} // Reset form after submission
          />
        );
      default:
        return null; // Fallback for invalid step
    }
  };

  return (
    <div className="unique-jobposting-container">
      {renderStep()} {/* Display the current step */}
    </div>
  );
}
