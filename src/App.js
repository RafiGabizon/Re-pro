import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import QustionAsk from './pages/QustionAsk';
import Articles from './pages/Articles';
import Employers from './pages/Employers';
import JobsAbroad from './pages/JobsAbroad';
import LogIn from './pages/LogIn';
import TermsOfUse from './pages/TermsOfUse';
import Policy from './pages/Policy';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import ContactAdvisor from './Components/ContactAdvisor';
import Recommands from './pages/Recommands';
import JobDetail from './pages/JobDetail';
import Register from './pages/Register';
import RegisterStepTwo from './pages/RegisterStepTwo';
import ConfirmRegistration from './pages/ConfirmRegistration';
import JobPosting from './pages/JobPosting';
import NextStepJobPosting from './pages/NextStepJobPosting';
import { TfiEmail } from "react-icons/tfi";
import AdminHome from './pages/admin/AdminHomePage';
import ManageJobs from './pages/admin/ManageJobs';
import ManageHotJobs from './pages/admin/ManageHotJobs';
import AdminNavbar from './Components/admin/AdminNavbar';
import AdminFooter from './Components/admin/AdminFooter';
import ManageArticles from './pages/admin/ManageArticles';
import ManageHomePage from './pages/admin/ManageHomePage';

function NavbarSelector() {
  const location = useLocation();
  
  if (location.pathname.startsWith('/admin')) {
    return <AdminNavbar />;
  }
  return <Navbar />;
}

function FooterSelector() {
  const location = useLocation();
  
  if (location.pathname.startsWith('/admin')) {
    return <AdminFooter />;
  }
  return <Footer />;
}

function App() {
  const [isContactAdvisorOpen, setIsContactAdvisorOpen] = useState(false);
  const location = useLocation();

  const toggleContactAdvisor = () => {
    setIsContactAdvisorOpen(!isContactAdvisorOpen);
  };

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <NavbarSelector />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/QustionAsk" element={<QustionAsk />} />
        <Route path="/Articles" element={<Articles />} />
        <Route path="/Employers" element={<Employers />} />
        <Route path="/JobsAbroad" element={<JobsAbroad />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/TermsOfUse" element={<TermsOfUse />} />
        <Route path="/Policy" element={<Policy />} />
        <Route path="/Recommands" element={<Recommands />} />
        <Route path="/job/:id" element={<JobDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register2" element={<RegisterStepTwo  />} />
        <Route path="/RegisterConfirm" element={<ConfirmRegistration />} />
        <Route path="/JobPosting" element={<JobPosting />} />
        <Route path="/NextStepJobPosting" element={<NextStepJobPosting />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/jobs" element={<ManageJobs />} />
        <Route path="/admin/hot-jobs" element={<ManageHotJobs />} />
        <Route path="/admin/articles" element={<ManageArticles />} />
        <Route path="/admin/manageHome" element={<ManageHomePage />} />
      </Routes>
      {!isAdminRoute && (
        <>
          <ContactAdvisor isOpen={isContactAdvisorOpen} onClose={toggleContactAdvisor} />
          <button
            className="consultant-button"
            onClick={toggleContactAdvisor}
            aria-label="Contact us"
          >
            {window.innerWidth < 900 ? <TfiEmail /> : "פנייה ליועץ תעסוקתי"}
          </button>
        </>
      )}
      <FooterSelector />
    </>
  );
}

export default App;
