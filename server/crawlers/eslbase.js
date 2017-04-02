'use strict';

const osmosis = require('osmosis');
const helper = require ('./helper')();



module.exports = (database,saveData) => {
    const JobList = database.model('JobList');



    return {
        scrape: () => {

osmosis
    .get('http://www.eslbase.com/jobs/')
    .find('.wpjb-grid-row')
    .set({
        'position': ".job-title",
        'location': ".job-location",
        'apply': "a@href",
        'description':'.job-summary'

        //follow link is not working correctly
    //})
    //.find ('.wpjb-grid-row')
    //.follow('@href')
    //.set({
    //    'description': "h2"
    })
    .data
    (function (data) {

        // @TODO caryout the transformations you want on this data
        // @TODO guess the country based on a string entered
        // extracting categories
        // extracting countries
        let categories = [];
        data.description = data.description || 'No description provided - For more information please go to Apply';
        categories = helper.getTags(data.description && data.position);
        data.category = categories.length > 0 ? categories : [];
        return data;
    })
    .then (function (err, data) {
        saveData(data);
    });
        }
    }
}















//keep that in case
//x('http://www.eslbase.com/jobs/',
//    '.wpjb-featured', [{
//
//        position: '.job-title',
//        location: '.job-location',
//        apply: 'a@href',
//        description: x('a@href', {
//            title: '.title',
//            details: '.wpjb-text'
//
//        })
//
//}])
//
//(function(err, obj){
//    var data = JSON.parse(JSON.stringify(obj).replace(/(\\n|\\t)/g, '')
//        .replace(/  +/g, ' ')
//        .replace(/(\r\n|\n|\r)/g,""));
//
////    console.log(obj);
////});
////
//})((err, data) => {
//    //console.log('Data:' + JSON.stringify(data));
//    if (err) {
//
//        return;
//    } else {
//
//
//
//        /**
//         //         * loop the data that
//         //         */
//
//        data.map((value, index) => {
//            //value.description = trimString(value.description.details);
//            //value.location = value.location.trim();
//            //value.description = replaceRtn(value.description.details);
//            //console.log(value);
//            database.ref('esljobs').push({
//                position: value.position,
//                location: value.location.trim(),
//                apply: value.apply,
//                description: value.description.details
//
//            })
//        })
//    }
//    console.log('---I got you Baby----');
//});
