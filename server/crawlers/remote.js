const osmosis = require('osmosis');
const JobModel = require ('./models/jobs');


osmosis
    .get('https://www.higheredjobs.com/search/remote.cfm')
    .find('.row.record')

    .set({
        'position': ".col-sm-7",

        'apply': "a@href"
    })
        .follow ('col-sm-7 a[href] ')
            .set ({
                description: '.jobDesc'
            })



    //.find ('.js-contractor-tier')
    //.set ('salary')
    //.follow ('@href')
    //.set ({
    //    'description': '.break'
    //
    //})

    .data(function(listing) {
        console.log(listing);
    });

//x('https://www.higheredjobs.com/search/remote.cfm',
//    '#overview-records.striped', [{
//
//        position: '.a',
//
//
//        apply: 'a@href',
//        description: x('a@href', {
//            title: '.jobtitle-header',
//            details: '.jobDesc'
//
//        })
//
//    }])
/**
 * maje firebase connection
 * @type {firebase}
 */
//var firebase = require('firebase');
//
///**
// * initialize firebase app
// */
//var config = firebase.initializeApp({
//    apiKey: "AIzaSyAIjB_xJdMXYSH5cRi-zRHjzu_fu4KGbUs",
//    authDomain: "teacherjobs-91050.firebaseapp.com",
//    databaseURL: "https://teacherjobs-91050.firebaseio.com",
//    storageBucket: "teacherjobs-91050.appspot.com",
//});
//
///**
// * call to firebase data
// * @type {firebase.database.Database|*|firebase.database.Database}
// */
//var database = config.database();
//
//
///**
// **************************************************************************
// **************************************************************************
// */
//
///**
// *
// * Firebase write function
// * @autor Olatunde Owokoniran || hurlatunde@gmail.com
// * @param params
// * @param callBackData
// */
//function saveData(params, callBackData) {
//    var key = database.ref().child(params.path).push().key;
//    var path = params.path;
//    var objectData = params.data;
//
//    if (!path || path == "undefined") {
//        callBackData({error: 'path required to interact with Firebase'});
//    }
//
//    /**
//     * firebase call pints to database - reference to the database
//     */
//    firebase.database().ref(path).child(key).set(objectData, function (error) {
//        if (error) {
//            console.log("Data could not be saved." + error);
//        } else {
//            callBackData(error);
//        }
//    });
//}
//
//function updateData(params, callBackData) {
//    var path = params.path;
//    var objectData = params.data;
//
//    if (!path || path == "undefined") {
//        callBackData({error: 'path required to interact with Firebase'});
//    }
//
//    /**
//     * firebase call pints to database
//     */
//    firebase.database().ref(path).update(objectData, function (error) {
//        if (error) {
//            console.log("Data could not be saved." + error);
//        } else {
//            callBackData(error);
//        }
//    });
//}
//
//function deleteData(params, callBackData) {
//    var path = params.path;
//
//    if (!path || path == "undefined") {
//        callBackData({error: 'path required to interact with Firebase'});
//    }
//
//    /**
//     * firebase call pints to database - realtime listener to database
//     */
//    firebase.database().ref(path).on('value', function (snapshot) {
//        var data = snapshot.val();
//        if (!data.node_id) {
//            data.node_id = snapshot.key;
//        }
//        callBackData({data: data});
//    }, function (error) {
//        callBackData({error: error});
//    });
//}
//
//
//function replaceString (inputString) {
//    return inputString.replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, '-').replace(/^(-)+|(-)+$/g,'');
//}
//
//
//
//
//
//
//(function(err, obj){
//    //var data = JSON.parse(JSON.stringify(obj).replace(/(\\n|\\t)/g, ''));
//
//    //for (var item=0; item < msg.length; item++) {
//    //
//    //    eslData[item].Type = "ESL Jobs";
//    //}
//
//    console.log(obj);
//});
//
////})((err, obj) => {
////    if (err) {
////        console.log(err);
////        return;
////    } else {
////        console.log('------got data---------');
////
////        /**
////         * loop the data that
////         */
////        obj.items.forEach(function (item) {
////           // console.log(item);
////           //item.description = replaceString(item.description);
////           // item.title = replaceString(item.title);
////            saveData({
////                path: '/jobs',
////                data: item
////            }, function (data) {
////                console.log(data);
////            });
////        });
////
////        console.log('-----Done-------');
////    }
////});