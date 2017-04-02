const Xray = require('x-ray');
const x = Xray({
    filters: {
        trim: function (value) {
            return typeof value === 'string' ? value.trim() : value
        }
    }
    });

function saveData(params, callBackData) {
    var key = database.ref().child(params.path).push().key;
    var path = params.path;
    var objectData = params.data;

    if (!path || path == "undefined") {
        callBackData({error: 'path required to interact with Firebase'});
    }

    /**
     * firebase call pints to database - reference to the database
     */
    firebase.database().ref(path).child(key).set(objectData, function (error) {
        if (error) {
            console.log("Data could not be saved." + error);
        } else {
            callBackData(error);
        }
    });
}

function updateData(params, callBackData) {
    var path = params.path;
    var objectData = params.data;

    if (!path || path == "undefined") {
        callBackData({error: 'path required to interact with Firebase'});
    }

    /**
     * firebase call pints to database
     */
    firebase.database().ref(path).update(objectData, function (error) {
        if (error) {
            console.log("Data could not be saved." + error);
        } else {
            callBackData(error);
        }
    });
}

function deleteData(params, callBackData) {
    var path = params.path;

    if (!path || path == "undefined") {
        callBackData({error: 'path required to interact with Firebase'});
    }

    /**
     * firebase call pints to database - realtime listener to database
     */
    firebase.database().ref(path).on('value', function (snapshot) {
        var data = snapshot.val();
        if (!data.node_id) {
            data.node_id = snapshot.key;
        }
        callBackData({data: data});
    }, function (error) {
        callBackData({error: error});
    });
}


//vietnam crawler!

x('http://vietnamteachingjobs.com/',
    '.wpjb-free', [{

        position: '.wpjb-column-title ',
        location: '.wpjb-column-location',
        salary: '.wpjb-column-salary',
        apply:'a@href',
        description: x('a@href', {
            title: '.entry-title',
            details: '.wpjb-job-text '
    })
}])

(function(err, obj){
    var data = JSON.parse(JSON.stringify(obj).replace(/(\\n|\\t)/g, '')
        .replace(/  +/g, ' ')
        .replace(/(\r\n|\n|\r)/g,""));

    //for (var item=0; item < msg.length; item++) {
    //
    //    eslData[item].Type = "ESL Jobs";
    //}


    console.log(data);
});
//
//})((err, obj) => {
//    if (err) {
//        console.log(err);
//        return;
//    } else {
//        console.log('------got data---------');
//
//        /**
//         * loop the data that
//         */
//        obj.items.forEach(function (item) {
//           // console.log(item);
//           //item.description = replaceString(item.description);
//           // item.title = replaceString(item.title);
//            saveData({
//                path: '/jobs',
//                data: item
//            }, function (data) {
//                console.log(data);
//            });
//        });
//
//        console.log('-----Done-------');
//    }
//});
