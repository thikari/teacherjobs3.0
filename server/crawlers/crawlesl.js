'use strict';

const osmosis = require('osmosis');
const helper = require ('./helper')();

module.exports = (database,saveData) => {
    const JobList = database.model('JobList');



    return {
        scrape: () => {

osmosis
    .get('http://www.eslcafe.com/joblist/')

    .find('dd')


    .set({
        'position': "strong a",
        'location': ".strong a",
        'description': ".description.break",
        'apply': "strong a@href"})
    .follow('@href')
    .set({
        'description': "blockquote p"
    })

    .data (function (data) {
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

