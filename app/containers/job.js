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
                   <a href= { this.props.data.apply }>
                      { this.props.data.position}
                    </a>
                </h3>
                <p>{ this.props.data.description }</p>
                <p>{ this.props.data.city }, { this.props.data.country }</p>
            </div>
        );
    }
}