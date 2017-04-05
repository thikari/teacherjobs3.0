import React, { Component } from 'react';
import Job from './job.js';
export default class Jobs extends Component {
    constructor(props) {
        super(props);
        this.getJobs = this.getJobs.bind(this);
    }

   getJobs() {
       let jobs = [];
       this.props.data.forEach((job, index) => {
           let jobComponent = <Job data={ job } key={index}></Job>;
           jobs.push(jobComponent);
       });

       return (
           <div>
               { jobs }
           </div>
       );
   }

    render() {
        return (
            <div>
                {this.getJobs()}
            </div>
        );
    }
}