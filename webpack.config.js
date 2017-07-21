// webpack.config.js
const path = require('path');
const webpack = require('webpack')
const pkg = require('./package.json');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: __dirname +  "/src/core.js",
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'nui.js'
    },

    module: {
        rules: [
            {
                test:/\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test:/\.css$/,
                loader: 'style!css?modules!postcss'
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/src/index.html"
        }),
        new webpack.HotModuleReplacementPlugin()
    ],

    devServer: {
        contentBase: path.join(__dirname, "src"),
        historyApiFallback: true,
        inline: true
    }
    
}