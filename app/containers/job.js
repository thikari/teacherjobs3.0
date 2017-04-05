import React, { Component } from 'react';

require("../styles/job.less");
export default class Job extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="job-container">
                <h3 className="title">
                   This is a job title 
                </h3>
                <p>{ this.props.data.description }</p>
            </div>
        );
    }
}