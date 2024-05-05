import React, { Component } from "react";
import '../styles/styles.css';
class NavBar extends Component {
    render() {
        return (
            <div className="navbar">
                <h1 className="title"></h1>
                <nav className="links">

                    <div className="log_in_Link">
                        <a href="/log_in" className="Link-7">איזור אישי</a>
                    </div> 

                    <div className="left-links">
                    <a href="/" className="Link-1">
                            <img src="..\assets\Repro_Logo.jpg" className="logo" alt="דף בית" />
                        </a>
                        <a href="/job_abroad" className="Link-5">עבודות בחו"ל</a>
                        <a href="/employers" className="Link-4">מעסיקים</a>
                        <a href="/articles" className="Link-3">כתבות</a>
                        <a href="/q_a" className="Link-2">שאלות ותשובות</a>
                        <a href="/about" className="Link-6">אודות</a>
                           
                    </div>
                </nav>
            </div>
        )
    }
}

export default NavBar;
