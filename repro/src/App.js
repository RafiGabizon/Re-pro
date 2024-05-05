import React, { Component } from "react";
import { jobs_ar } from "./data/jobs";
import JobsComp from './comps/jobsComp';
import NavBar from './comps/navBarComp';
import ButtomBar from './comps/buttomBarComp';

class App extends Component {
    state = {jobs_ar:jobs_ar};
    render(){
        return(
            <div className="App">
                <NavBar/>
                <JobsComp/>
                <ButtomBar/>
            </div>
        )
    }
}

export default App;