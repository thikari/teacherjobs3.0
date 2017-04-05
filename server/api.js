'use strict'
const express = require('express');
const router = new express.Router();

module.exports = (database) => {
    const JobList = database.model('JobList');

    // get offset
    function getOffset(page, pageSize) {
        return (page * pageSize) - pageSize;
    }

    // build query
    function buildQuery(params) {
        let query = {};
        if(params.categories) {
            if(params.categories !== '[]') {
                query.category = {
                    "$in": JSON.parse(params.categories)
                }
            }
        }
        if(params.country) {
            query.country = params.country;
        }
        if(params.city) {
            query.city = params.city;
        }

        return query;
    }

    // returns the length of items that matches the filters without pagination
    function getJobsLength(params, cb) {
        let query = buildQuery(params);
        JobList.find(query).count((err, result) => {
            if(err) {
                cb(err);
            } else {
                cb(null, result);
            }
        });
    }

    // This method gets the mapping between the countries and their associated cities
    function getCountryCityMap(jobs) {
        let result = {};
        jobs.forEach((job) => {
            if(result[job.country]) {
                if(result[job.country].indexOf(job.city) < 0) {
                    result[job.country].push(job.city);
                }
            } else {
                result[job.country] = [];
                result[job.country].push(job.city);
            }
        });

        return result;
    }

    // This method gets the mapping between the countries and their associated cities
    function getCategories(jobs) {
        let result = {};
        jobs.forEach((job) => {
            job.category.forEach((item) => {
                result[item] = '_';
            });
        });
        return Object.keys(result);
    }
    
    // This endpoint returns jobs that matches the filter criteria provided in the query params    
    router.route('/jobs')
        .get((req, res) => {
           if(!req.query.pageSize) {
               req.query.pageSize = 20;
           }
            if(!req.query.page) {
               req.query.page = 1;
           }
           
           getJobsLength(req.query, (err, length) => {
               let query = buildQuery(req.query);
                   JobList.find(query)
                   .limit(req.query.pageSize*1 || 0)
                   .skip(getOffset(req.query.page, req.query.pageSize))
                   .toArray((err, results) => {
                        if(err) {
                            res.status(500).send('Cannot get jobs');
                        } else {
                            res.status(200).send({ 
                                data: results,
                                filteredDataSize: length
                            });
                        }
                    });
           });
        });
    
    // This end points returns the filters for countries, cities and categories
    router.route('/filters')
        .get((req, res) => {
            console.log('filters called');
            JobList.find({ }).toArray((err, results) => {
                if(err) {
                    res.status(500).send('Cannot get filters data');
                } else {
                    res.status(200).send({
                        countryCitymap: getCountryCityMap(results),
                        categories: getCategories(results)
                    });
                }
            });
        });

    // exports this routes
    return router;
}


