'use strict'
const express = require('express');
const router = new express.Router();

module.exports = (database) => {
    const JobList = database.model('JobList');

    // get offset
    function getOffset(pageNum, pageSize) {
        return (pageNum * pageSize) - pageSize;
    }

    //the logic for the filtering your database
    function buildFilterQuery(filters) {
        let query = {};
        if(filters.categories) {
            query.category = {
                "$in": filters.categories
            }
        }
        if(filters.location) {

            if(filters.location.country) {
                query.country = filters.location.country;
            }
            if(filters.location.city) {
                query.city = filters.location.city;
            }
        }

        return query;
    }

    router.route('/')
        .get((req, res) => {
            JobList.find({ }).toArray((err, results) => {
                if(err) {
                    res.status(500).send({ msg: 'There was an error getting data'});
                } else {
                    res.status(200).send(results);
                }
            });
        });

    router.route('/filter')
        .post((req, res) => {
            let filter = JSON.parse(req.body.filters);
            console.log(filter);
            JobList
                .find(buildFilterQuery(filter))
                .toArray((err, results) => {
                    if(err) {

                        res.status(500).send({ msg: 'There was an error filtering data'});
                    } else {
                        res.status(200).send(results);
                    }
                });

        });

    router.route('/totaljob')
        .post((req, res) => {
            let filter = JSON.parse(req.body.filters);
            JobList.find(buildFilterQuery(filter)).toArray((err, results) => {
                if(err) {
                    res.status(200).send({ size: 0 });
                } else {
                    res.status(200).send({ size: results.length });
                }
            });
        });

    //the logic for limiting page items/ site
    router.route('/paginate')
        .post((req, res) => {
            let pageSize = 20;
            let filter = JSON.parse(req.body.filters);
            let pageNum = JSON.parse(req.body.page) || 1;
            let offset = getOffset(pageNum, pageSize);

            console.log(filter);
            console.log(pageNum)
            console.log(offset)

            JobList
                .find(buildFilterQuery(filter))
                .limit(pageSize)
                .skip(offset)
                .toArray((err, results) => {
                    if(err) {

                        res.status(500).send({ msg: 'There was an error filtering data'});
                    } else {
                        res.status(200).send(results);
                    }
                });

        });


    // exports this routes
    return router;
}


