'use strict';

const osmosis = require('osmosis');
const helper = require ('./helper')();



module.exports = (database, saveData) => {
    const JobList = database.model('JobList');



    return {
        scrape: () => {
            osmosis
                .get('https://www.teachaway.com/teaching-jobs-abroad')

                .find('.post-entry')


                .set({
                    'position': ".row h3",
                    'location': "span.job-location",
                    'description': ".description.break",
                    'apply': "a@href"})
                .follow('@href')
                .set({
                    'description': ".field-items"
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