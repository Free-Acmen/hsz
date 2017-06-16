var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    target: 'node',
    externals: [nodeExternals()],
    entry: {
        app: './hsz.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.scss', 'json']
    },
    moudle: {
        rules: [{
            test: /\.js/,
            loader: 'babel-loader'
        }, {

        }]
    }
};