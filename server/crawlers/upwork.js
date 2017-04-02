'use strict';

const osmosis = require('osmosis');
const helper = require ('./helper')();


// to get the link
const host = 'https://www.upwork.com/';
const scrapPath = 'o/jobs/browse/skill/teaching-english/';

module.exports = (database,saveData) => {
    const JobList = database.model('JobList');

    return {
        scrape: () => {

osmosis
    .get('https://www.upwork.com/o/jobs/browse/skill/teaching-english/')
    .find('.row')


    .set({
        'position': "h2",
        'description': ".description.break",
        'apply': "header a@href"

    }).data (function(data){
    let apply = [];
    data.apply = host + data.apply;
        data.location = 'remote';
    return data;
})
    //.then (function (err, data) {
    //    //saveData(data);
    //    console.log(data)
    //});
    .data (function (data) {

        let categories = [];

        data.description = data.description || 'No description provided';
        categories = helper.getTags(data.description );
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