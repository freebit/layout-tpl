
'use strict';

const DEV_MODE = 'development';
const PROD_MODE = 'production';

const NODE_ENV = process.env.NODE_ENV || DEV_MODE;

const path = require('path');
const webpack = require('webpack');


module.exports = {
    context: __dirname + '/src',

    entry:{
        app: './js/app',
    },

    output:{
        path: __dirname + '/public/js',
        publicPath: '/js',
        filename: '[name].js'
    },

    resolve:{
        extensions: ['','.js','.less']
    },

    //watch: NODE_ENV == DEV_MODE,

    watchOptions:{
        aggregateTimeout:100
    },

    devtool: NODE_ENV == DEV_MODE ? 'cheap-inline-module-source-map' : null,

    plugins:[
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            USER: JSON.stringify(process.env.USER),
            DEV_MODE: JSON.stringify(DEV_MODE),
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),

        new webpack.ProvidePlugin({
            _: 'lodash'
        })

    ],

    module:{

        loaders:[
            {
                loader: 'babel-loader',
                test: /\.js$/,

                include:[
                    __dirname + '/src/js'
                ],

                query:{
                    presets: ['es2015'],
                    plugins: ['transform-runtime']
                }

            }
        ],
        noParse: /\/node_modules\/(angular\/angular|jquery|lodash)/
    }
}

if(NODE_ENV == PROD_MODE){
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings:false,
                drop_console: true,
                unsafe: true
            }
        })
    );
}