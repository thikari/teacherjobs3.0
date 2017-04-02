'use strict';
const Xray = require('x-ray');
const x = Xray();
const osmosis = require('osmosis');
var firebase = require('firebase');
var cron = require('node-cron');
var mongoose = require('mongoose');
var Job = require('../models/jobs');
mongoose.Promise = global.Promise;

const helper = require ('./helper')();
console.log (helper.getTags);

//2.)database firebase
//
//var config = firebase.initializeApp({
//    apiKey: "AIzaSyD6L5tpmDoHqCv0GNVWhbBz5Slm7LZVeoA",
//    authDomain: "test-defdc.firebaseapp.com",
//    databaseURL: "https://test-defdc.firebaseio.com",
//    storageBucket: "test-defdc.appspot.com"
//});
//
//var database = config.database();


//database mongoose
var mongoDB = 'mongodb://Tobi:270582@ds141450.mlab.com:41450/teacherjobs';
mongoose.connect(mongoDB);


//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


let newJobs = [];

osmosis
    .get('http://www.idealist.org/search/v2/?qs=QlpoOTFBWSZTWfscxAQAAKSfgAMAcAIDAAAAv_f_oDAA2CGqfqnonqeoxA0A0BjAATAAEwSSaTCaAU8k9Mmpp3HIZvRLXK7qwVoa17Z2ax9aZlwinGLlL98QgNa4chALjvy5v6fbHyaF7jl0vCtwNBt6oWcCNSUujit_K0jg2iE2rnqEUbW1lnkaGo2aFVrYOyVr1GhTXeg8e76PMwCXzN3GQy8J80mDsiAWX6-wR5a8NIYibYxEovxsEpppabg0_Eh2-hGUniypEBVoOSZiAXKOGfyJ_bXQbImsCIXT8XckU4UJD7HMQEA=')
    .find('#search_resultsBrowser > ul > li')

    .set({
        'position': "div.assetName",
        'location': ".location"
    })
    .follow('@href')
    .set({
        'description': ".listing-overview-description"

    })

    .data (function (data){
        newJobs.push(data);

        newJobs.save (function(err) {
            if (err) throw err;
            console.log ('gotcha');
        });

    });

//.then (function saveJobs (newJobs) {
//    var newData = new Job;
//    newData.save (function(err) {
//        if (err) throw err;
//        console.log ('gotcha');
//    });
//});












//
//
////for tabs, new lines etc.
//function replaceString (inputString) {
//    return inputString.replace(/(?:\\[rnt]|[\r\n\t\s]+)+/g, "");
//}
//
//
//function trimString (inputString) {
//    return inputString.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '').replace(/(?:\\[rnt]|[\r\n\t]+)+/g, "");
//}
//
//
//function replaceRtn (inputString) {
//    return inputString.replace(/(?:\\[rnt]|[\r\n\t\s]+)+/g, "");
//}
//
////this  method scrapes the website once a day
////function scrapeWebsite() {
////    console.log('Cron job started');
//    //works but caption of description sucks a little bit
//    let savedData = [];
//    osmosis
//        .get('http://www.idealist.org/search/v2/?qs=QlpoOTFBWSZTWfscxAQAAKSfgAMAcAIDAAAAv_f_oDAA2CGqfqnonqeoxA0A0BjAATAAEwSSaTCaAU8k9Mmpp3HIZvRLXK7qwVoa17Z2ax9aZlwinGLlL98QgNa4chALjvy5v6fbHyaF7jl0vCtwNBt6oWcCNSUujit_K0jg2iE2rnqEUbW1lnkaGo2aFVrYOyVr1GhTXeg8e76PMwCXzN3GQy8J80mDsiAWX6-wR5a8NIYibYxEovxsEpppabg0_Eh2-hGUniypEBVoOSZiAXKOGfyJ_bXQbImsCIXT8XckU4UJD7HMQEA=')
//        .find('#search_resultsBrowser > ul > li')
//
//        .set({
//            'position': "div.assetName",
//            'location': ".location"
//        })
//        .follow('@href')
//        .set({
//            'description': ".listing-overview-description"
//
//        })
//
//        .data (function (data){
//
//            console.log (data);
//            savedData.push(data);
//        })
//        .then (function (err, dataArr) {
//            //for each (var item in savedData) {
//            //    database.ref('testjobs').push({
//            //        position: value.position,
//            //        location: value.location,
//            //        description: value.description
//            //
//            //    })
//            //})
//
////    var chinaData = new ChinaModel({name: "testRun"}); chinaData.save(function(err, res){ console.log(err, res)});
////    ChinaModel.collection.insert(data);
////}
//
//
//
//
//            savedData.forEach((item) => {
//                database.ref('testjobs').push(
//                    {
//                        position: item.position,
//                        location: item.location,
//                        description: item.description || 'No description provided'
//                    }
//                );
//            });
//
//            console.log('---I got you Baby----');
//        });
//}




// Configure cron-job
//cron.schedule('* * 1 * * *', scrapeWebsite);

