var webpack = require('webpack');
var path = require('path');

var publicPath = 'http://localhost:3000/';
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

module.exports = {
    entry: {
        page1: ['./public/index.js', hotMiddlewareScript]
    },
    output: {
        path: path.resolve('../dist'),
        filename: './[name]/bundle.js',
        publicPath: publicPath
    },
    resolve: {
        extensions: ['.js', '.scss', 'json']
    },
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader'
        }, {
            test: /\.(png|jpg)$/,
            use: 'url-loader?limit=8192&context=client&name=[path][name].[ext]'
        }, {
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader?sourceMap',
                'resolve-url-loader',
                'sass-loader?sourceMap'
            ]
        }]
    },
    plugins: [
        // new webpack.optimize.OccurenceOrderPlugin(),   webpack2.0 已默认该功能
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};