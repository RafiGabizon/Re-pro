import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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


function App() {
    const [isContactAdvisorOpen, setIsContactAdvisorOpen] = useState(false);

    const toggleContactAdvisor = () => {
        setIsContactAdvisorOpen(!isContactAdvisorOpen);
    };

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/About" element={<About/>} />
                <Route path="/Contact" element={<Contact/>} />
                <Route path="/QustionAsk" element={<QustionAsk/>} />
                <Route path="/Articles" element={<Articles/>} />
                <Route path="/Employers" element={<Employers/>} />
                <Route path="/JobsAbroad" element={<JobsAbroad/>} />
                <Route path="/LogIn" element={<LogIn/>} />
                <Route path="/TermsOfUse" element={<TermsOfUse/>} />
                <Route path="/Policy" element={<Policy/>} />
                <Route path="/Recommands" element={<Recommands/>} />
                <Route path="/job/:id" element={<JobDetail/>} />
                <Route path="/Register" element={<Register/>} />
                <Route path="/Register2" element={<RegisterStepTwo/>} />
                <Route path="/RegisterConfirm" element={<ConfirmRegistration/>} />


            </Routes>
            <ContactAdvisor isOpen={isContactAdvisorOpen} onClose={toggleContactAdvisor} />
            <button
                className="consultant-button"
                onClick={toggleContactAdvisor}
                aria-label="Contact us"
                >
                {window.innerWidth <= 768 ? "דברו איתנו" : "פנייה ליועץ תעסוקתי"}
                </button>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
