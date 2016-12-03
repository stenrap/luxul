var path = require('path');

module.exports = {
    entry: {
        luxul: './src/index.js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    output: {
        path: __dirname + '/build/',
        filename: 'luxul.bundle.js'
    }
};
