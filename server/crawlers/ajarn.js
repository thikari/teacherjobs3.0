'use strict';

const osmosis = require('osmosis');
const helper = require('./helper')();


module.exports = (database,saveData) => {
    const JobList = database.model('JobList');


    return {
        scrape: () => {

            osmosis
                .get('http://www.ajarn.com/recruitment/browse_jobs/index.html')
                .find('.jobFrame.silver')
                .set({
                    'position': "h1",
                    'location': ".col-xs-6.col-sm-4",
                    'salary': '.col-xs-12 col-sm-5',
                    'apply': "a@href"
                })
                .follow('@href')
                .set({
                    'description': ".row div:nth-child(2)"
                })
                .data
                (function (data) {
                    // @TODO caryout the transformations you want on this data
                    // @TODO guess the country based on a string entered
                    // extracting categories
                    // extracting countries
                    let categories = [];
                    data.description = data.description || 'No description provided';
                    categories = helper.getTags(data.description && data.position);
                    data.category = categories.length > 0 ? categories : [];
                    return data;

                })
                .then(function (err, data) {
                    //saveData(data);
                    console.log(data);
                });
        }

    }
}







