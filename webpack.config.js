const path = require('path');
const webpack = require('webpack');


module.exports = {
    context: path.join(__dirname, 'app'),
    entry: [
        './index.js'
    ],
    output: {
        path: path.join(__dirname, 'internals'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loaders: ['babel-loader?presets[]=react,presets[]=es2015'],

            },

            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader'

            },

            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }

        ]
    },
    stats: {
        colors: true
    },

    resolve: {
        modules: [
            path.join(__dirname, 'node_modules'),
        ]
    }
};