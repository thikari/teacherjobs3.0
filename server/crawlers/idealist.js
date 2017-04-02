'use strict';

const osmosis = require('osmosis');
const helper = require ('./helper')();



module.exports = (database) => {
    const JobList = database.model('JobList');

    // This function saves our data to mlabs
    function saveData(data) {
        JobList.update({ position: data.position }, data, { upsert:true }, () => {
            console.log('Data saved for idealist');
        });
    }

    return {
        scrape: () => {


    osmosis
        .get('https://www.idealist.org/?q=teacher')
        .find('#search_resultsBrowser > ul > li')
        .set({
            'position': "div.assetName",
            'location': ".location"
        })
        //.follow('@href')
        //.set({
        //    'description': ".listing-overview-description"
        //})
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
            console.log(data);
        });
        }
    }
}