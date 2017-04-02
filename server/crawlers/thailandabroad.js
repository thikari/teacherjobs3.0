

//details is not working


'use strict';

const osmosis = require('osmosis');
const helper = require ('./helper')();

const host = 'http://thailand.findworkabroad.com/';
const scrapPath = 'teaching-jobs-in-thailand';

module.exports = (database,saveData) => {
    const JobList = database.model('JobList');

    return {
        scrape: () => {

            osmosis
                .get("http://thailand.findworkabroad.com/teaching-jobs-in-thailand")
                .find('table.joblist')
                .set({
                    'position': "td:nth-child(2)",
                    //'location': "td:nth-child(4)",
                    //'salary': ".js-budget",
                    //'description': ".description.break",
                //    'apply': "a@href"
                //
                //})
                //.follow('a@href')
                //.set({
                //    'description': "td:nth-child(9) .jobview"
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
                    //saveData(data);
                    console.log(data)
                });
        }
    }
}







