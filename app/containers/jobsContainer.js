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
            jobs: [],
            pageInfo: {
                filters: {
                    country: '',
                    city: '',
                    categories: []
                },
                pagination: {
                    page: 1,
                    pageSize: 10,
                    totalItems: 2
                }
            }
        }

        //Bind fuctions correctly to this class
        this.onPaginate = this.onPaginate.bind(this);
        this.onFiltersLoaded = this.onFiltersLoaded.bind(this);
        this.onFilter = this.onFilter.bind(this);
    }

    // we get the default jobs once the componenent has mounted
    onFiltersLoaded() {
        console.log('filters loaded');
        this.getJobs();
    }
    
    // This method is responsible for getting jobs from the server
    // The filters are read from the stateObject
    // When data is returned, the page
    getJobs() {
        jobsService.getJobs(this.state.pageInfo, (err, result) => {
            if(result) {
                console.log('jobs loaded');
                // update state with jobs 
                const newState = Object.assign({}, this.state);
                newState.jobs = result.data;
                newState.pageInfo.pagination.totalItems = result.filteredDataSize;
                this.setState(newState);
            } else {
                alert('Could not load jobs');
            }
        });
    }

    onPaginate(page) {
        // Updates pageInfo then getJobs from server
        console.log(page);
        const newState = Object.assign({}, this.state);
        newState.pageInfo.pagination.page = page;
        this.setState(newState);
        this.getJobs();
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
                    <Filters onFilter= {this.onFilter} onFiltersLoaded= {this.onFiltersLoaded} />
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