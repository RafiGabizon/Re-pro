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
                <Route path="/" element={<Home toggleContactModal={toggleContactAdvisor} />} />
                <Route path="/About" element={<About toggleContactModal={toggleContactAdvisor} />} />
                <Route path="/Contact" element={<Contact toggleContactModal={toggleContactAdvisor} />} />
                <Route path="/Qustion_Ask" element={<Qustion_Ask toggleContactModal={toggleContactAdvisor} />} />
                <Route path="/Articles" element={<Articles toggleContactModal={toggleContactAdvisor} />} />
                <Route path="/Employers" element={<Employers toggleContactModal={toggleContactAdvisor} />} />
                <Route path="/Jobs_Abroad" element={<Jobs_Abroad toggleContactModal={toggleContactAdvisor} />} />
                <Route path="/LogIn" element={<LogIn toggleContactModal={toggleContactAdvisor} />} />
                <Route path="/TermsOfUse" element={<TermsOfUse toggleContactModal={toggleContactAdvisor} />} />
                <Route path="/Policy" element={<Policy toggleContactModal={toggleContactAdvisor} />} />
            </Routes>
            <ContactAdvisor isOpen={isContactAdvisorOpen} onClose={toggleContactAdvisor} />
            <Footer />
        </BrowserRouter>
    );
}

export default App;
