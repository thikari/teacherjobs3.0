'use strict';

const osmosis = require('osmosis');
const helper = require ('./helper')();

const host = 'https://www.tes.com/';
const scrapPath = 'jobs/search?locations=International';

module.exports = (database,saveData) => {
    const JobList = database.model('JobList');

    return {
        scrape: () => {

osmosis
    .get(host + scrapPath)
    .find('.loading-panel')
    .set({
        'position': "h3",
        'location': "span:nth-child(2) > span",
        //'salary': ".js-budget",
        //'description': ".description.break",
        'apply': "a@href"

    })
    .follow('a@href')
    .set({
       'description': ".job-description"
    })


    .data (function (data) {
        // @TODO caryout the transformations you want on this data
        // @TODO guess the country based on a string entered
        // extracting categories
        // extracting countries
        let categories = [];
        data.description = data.description || 'No description provided';
        categories = helper.getTags(data.description && data.position );
        data.category = categories.length > 0 ? categories : [];
        return data;
    })
    .then (function (err, data) {
        saveData(data);
    });
        }
    }
}