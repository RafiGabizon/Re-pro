import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Qustion_Ask from "./pages/Qustion_Ask";
import Articles from "./pages/Articles";
import Employers from "./pages/Employers";
import Jobs_Abroad from "./pages/Jobs_Abroad";
import LogIn from "./pages/LogIn";
import TermsOfUse from "./pages/TermsOfUse";
import Policy from "./pages/Policy";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/About" element={<About />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/Qustion_Ask" element={<Qustion_Ask />} />
                <Route path="/Articles" element={<Articles />} />
                <Route path="/Employers" element={<Employers />} />
                <Route path="/Jobs_Abroad" element={<Jobs_Abroad />} />
                <Route path="/LogIn" element={<LogIn />} />
                <Route path="/TermsOfUse" element={<TermsOfUse />} />
                <Route path="/Policy" element={<Policy />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
