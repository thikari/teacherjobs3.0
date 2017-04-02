'use strict';
const locationfinder = require('../locationfinder');
//module starts to scrape all sites



module.exports = (database) => {
    const JobList = database.model('JobList');
    //first part is to check if it is remote jobs
    function saveData(data) {
        data.category = data.category || [];
        if(data.category.indexOf('remote') >= 0) {
            data.location = '';
        }
        // Test location finder
        locationfinder.getCityAndCountry(data.location, (locationInfo) => {
            data.city = locationInfo.city;
            data.country = locationInfo.country;
            //looking for matches in mongo lab
            JobList.update({position: data.position}, data, {upsert: true}, () => {
                console.log('Data saved!');
            });
        });

    }
// This function saves our data to mlabs
    const teachaway = require('./teachaway')(database, saveData);
    const tefl = require('./tefl')(database,saveData);
    const ajarn = require('./ajarn')(database,saveData);
    const asiateaching = require('./asiateaching')(database,saveData);
    const crawlesl = require ('./crawlesl')(database,saveData);
    const eslbase = require ('./eslbase')(database,saveData);
    const tes = require ('./tes')(database,saveData);
    const teachingthailand = require ('./teachingthailand')(database,saveData);
    const idealist = require ('./idealist')(database,saveData);
    const guardian_africa = require ('./guardian_africa')(database,saveData);
    const guardian_asiapacific = require ('./guardian_asiapacific')(database,saveData);

    const upwork = require ('./upwork')(database,saveData);

    const websites =
        [
            teachaway,
            tefl,
            ajarn,
            asiateaching,
            crawlesl,
            eslbase,
            tes,
            teachingthailand,
            idealist,
            guardian_africa,
            guardian_asiapacific,
            upwork
        ];

    // this function scrape all websites for data and save to mlab
    function scrapeWebsite() {
        console.log('scrapercall');
        websites.forEach((site) => {
            site.scrape();
        });
    }

    function getTimeInMillsecs(hours, minutes, seconds) {
        let hoursInMills = hours * 60 * 60 * 1000;
        let minutesInMills = minutes * 60 * 1000;
        let secondsInMills = seconds * 1000;
        return hoursInMills + minutesInMills + secondsInMills;
    }



    //test function for cities match
    //locationfinder.getCityAndCountry('Ubon Ratchathani', (info) => {
    //                console.log(info);
    //})
    //  scrapeWebsite();
    //start a cron-job that scrapes at regular intervals of 10 minutes
    setTimeout(() => {
        scrapeWebsite();
    }, getTimeInMillsecs(24, 0, 0));

}