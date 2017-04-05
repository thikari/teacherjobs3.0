import React, { Component } from 'react';
import Filters from './filters.js';
import Jobs  from './jobs.js';
import Pagination from './pagination.js';
import jobsService from '../services/jobs.js';

require("../styles/jobs-container.less");
export default class JobsContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            jobs: [
                { description: 'here is a job'},
                { description: 'here is a job1'},
                { description: 'here is a job2'}
            ],
            pageInfo: {
                filters: {
                    country: '',
                    city: '',
                    categories: []
                },
                pagination: {
                    currentPage: 1,
                    pageSize: 10,
                    totalPages: 2
                }
            }
        }

        //Bind fuctions correctly to this class
        this.onPaginate = this.onPaginate.bind(this);
        this.onFilter = this.onFilter.bind(this);
    }
    
    // This method is responsible for getting jobs from the server
    // The filters are read from the stateObject
    // When data is returned, the page
    getJobs() {

    }

    onPaginate(page) {
        // Updates pageInfo
        // getJobs from server
        console.log(page);
    }

    onFilter(value, type) {
        // Updates pageInfo
        // getJobs from server
        console.log(value, type);
    }

    render() {
        return (
           <div>
               <div className="filters-container">
                    <Filters onFilter= {this.onFilter} />
               </div>
               <div className="jobs-container">
                    <Jobs data={ this.state.jobs } />
               </div>
               <div className="pager-container">
                    <Pagination pagination={this.state.pageInfo.pagination} onPaginate= {this.onPaginate} />
               </div>
           </div>
        )
    }
}