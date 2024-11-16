// PostJob.js - הקומפוננטה הראשית
import React, { useState, useContext } from 'react';
import { JobsContext } from '../context/JobsContext';
import PostJobStep1 from '../Components/PostJobStep1';
import PostJobStep2 from '../Components/PostJobStep2';
import PostJobStep3 from '../Components/PostJobStep3';

export default function PostJob() {
  const { jobs, updateJobs } = useContext(JobsContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // שלב ראשון
    jobTitle: '',
    companyName: '',
    jobType: '',
    state: '',
    city: '',
    minCommitment: '',
    description: '',
    additionalRequirements: '',
    showAdditionalReq: false,
    // שלב שני
    visaType: '',
    flightType: '',
    accommodationType: '',
    salaryType: '',
    salaryAmount: '',
    // שלב שלישי
    mainImage: '',
    videoUrl: '',
    environmentImages: [],
    status: 'ממתין לאישור'
  });

  const handleNext = () => {
    setCurrentStep(prevStep => prevStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(prevStep => prevStep - 1);
  };

  const handleComplete = () => {
    // איפוס הטופס והחזרה לשלב הראשון
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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PostJobStep1
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <PostJobStep2
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <PostJobStep3
            formData={formData}
            setFormData={setFormData}
            onBack={handleBack}
            jobs={jobs}
            updateJobs={updateJobs}
            onComplete={handleComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="unique-jobposting-container">
      {renderStep()}
    </div>
  );
}