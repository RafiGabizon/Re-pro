import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Qustion_Ask from './pages/Qustion_Ask';
import Articles from './pages/Articles';
import Employers from './pages/Employers';
import Jobs_Abroad from './pages/Jobs_Abroad';
import LogIn from './pages/LogIn';
import TermsOfUse from './pages/TermsOfUse';
import Policy from './pages/Policy';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import ContactAdvisor from './Components/ContactAdvisor';

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
                <Route path="/Qustion_Ask" element={<Qustion_Ask/>} />
                <Route path="/Articles" element={<Articles/>} />
                <Route path="/Employers" element={<Employers/>} />
                <Route path="/Jobs_Abroad" element={<Jobs_Abroad/>} />
                <Route path="/LogIn" element={<LogIn/>} />
                <Route path="/TermsOfUse" element={<TermsOfUse/>} />
                <Route path="/Policy" element={<Policy/>} />
            </Routes>
            <ContactAdvisor isOpen={isContactAdvisorOpen} onClose={toggleContactAdvisor} />
            <button
                className="consultant-button"
                onClick={toggleContactAdvisor}
                aria-label="Contact a career advisor"
            >
                פנייה ליועץ תעסוקתי
                </button>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
