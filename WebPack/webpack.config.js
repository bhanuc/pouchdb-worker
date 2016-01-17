var webpack = require('webpack'),
    path = require('path');

module.exports = {
    debug: true,
    entry: {
        main: './index.js'
    },
    output: {
        filename: 'bundle.js' 
    },
    module: {
        loaders: [{
            test: /\.es6.js$/,
            loader: "babel-loader"
        }],
        noParse: /(lie|pouchdb)\.js$/
    },
};