'use strict';

const osmosis = require('osmosis');
const helper = require ('./helper')();


module.exports = (database,saveData) => {
    const JobList = database.model('JobList');



    return {
        scrape: () => {

        osmosis
            .get('http://www.asiateachingjobs.com/jobs/search')
            .find('.job-ad.paid-job')
            .set({
                'position': "h4",
                'location': ".left",
                'apply': "a@href",
            })
            .follow('@href')
            .set({
                'description': "p.jobs-description-all"
            })




             .data(function (data) {
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














// keep that in case you fucked up
//(function (err, obj) {
//    console.log('------got data---------');
//    var data = JSON.parse(JSON.stringify(obj).replace(/(\\n|\\t)/g, ''));
//    //.replace(/  +/g, ' ')
//    //.replace(/(\r\n|\n|\r)/g,""));
//
//    //console.log(data); });
////
//})((err, data) => {
//    if (err) {
//
//        return;
//    } else {
//        console.log('------got data---------');
//
//
//        data.map((value, index) => {
//
//            database.ref('asiajobs').push({
//                position: value.position,
//                //location: value.location.trim(),
//                location: replaceRtn(value.location),
//
//                description: value.description.details,
//            })
//        })
//    }
//    console.log('---I got you Baby----');
//});

