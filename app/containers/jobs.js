import React, { Component } from 'react';
import Job from './job.js';
export default class Jobs extends Component {
    constructor(props) {
        super(props);
        console.log('here');
        console.log(props);
        console.log('here');

        this.getJobs = this.getJobs.bind(this);
    }

   getJobs() {
       console.log('here')
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