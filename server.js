const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Database = require('./server/database');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const app = express();
const compiler = webpack(webpackConfig);


// test connection to database
function initDatabase(cb) {
    const dbName = 'teacherjobs';
    const collections = [
        'JobList',
    ];

    let url = `mongodb://Tobi:270582@ds141450.mlab.com:41450/teacherjobs`;

    (new Database({ collections, url })).connect((err, database) => {
        cb(database);
    });
}



//const server = app.listen(3000, function() {
//    const host = server.address().address;
//    const port = server.address().port;
//    console.log('Example app listening at http://%s:%s', host, port);
//});

'use strict';


// This is the function that starts our main express server
function bootstrapApp(database) {
    let crawlers = require('./server/crawlers')(database);

    app.use(methodOverride('_method'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));



    app.use(webpackDevMiddleware(compiler, {
        hot: true,
        filename: 'bundle.js',
        publicPath: '/',
        stats: {
            colors: true
        },
        historyApiFallback: true
    }));

    app.use('/api', require('./server/api')(database));
    //app.use(express.static(`${process.cwd()}/build/`));
    app.use(express.static(__dirname + '/internals'));

    app.listen(2400, () => {
        console.log('Example app listening on port 2400!');
    });
}


// lets initialize our database
initDatabase(bootstrapApp);
