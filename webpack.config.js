// webpack.config.js
const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const prodConfig = {
    entry: __dirname +  "/src/core.js",
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'nui.js',
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
                loader: 'style-loader!css-loader?modules'
            }
        ]
    },

    plugins: [
       new HtmlWebpackPlugin({
            template: __dirname + "/src/index.html"
        }),
    ]
    
}

var devConfig = () =>{
    const config = {
        devtool: 'eval-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'src'),
            historyApiFallback: true
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
        ],
    }

    return Object.assign( {}, prodConfig, config, { plugins: prodConfig.plugins.concat(config.plugins) } )
}


module.exports = function(env) {
    console.log("env is: ", env);

    if(env === "dev") {
        return devConfig();
    }

    return prodConfig;

    
}