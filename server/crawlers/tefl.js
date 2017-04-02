'use strict';

const osmosis = require('osmosis');
const helper = require ('./helper')();

const host = 'https://www.tefl.com/';
const scrapPath = 'job-seeker/';


module.exports = (database,saveData) => {
    const JobList = database.model('JobList');



    //
    return {
        scrape: () => {
            osmosis
                .get(host + scrapPath)
                .find('.job.elementWrapper')
                .set({
                    'position': ".jobTitle",
                    'location': ".jobCoreDetails",
                    'apply': "a@href"

                })

                .follow('@href')
                .set({
                    'description': '.details',

                })

                .data (function(data){
                    data.apply = host + data.apply
                    saveData(data);

                });
        }
    }
}
