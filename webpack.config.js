const path = require('path');
var BundleTracker = require('webpack-bundle-tracker');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',
    context: __dirname,
    entry: './assets/js/index', // entry point of our app. assets/js/index.js should require other js modules and dependencies it needs
    output: {
        path: path.resolve('./assets/bundles/'),
        filename: "[name]-[hash].js",
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(scss)$/,
                use: [
                    {
                        loader: 'style-loader', // inject CSS to page
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS modules
                    },
                    {
                        loader: 'postcss-loader', // Run postcss actions
                        options: {
                            plugins: function () { // postcss plugins, can be exported to postcss.config.js
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    {
                        loader: 'sass-loader' // compiles Sass to CSS
                    }
                ]
            },
        ]
    }
    ,
    resolve: {
        extensions: ['*', '.jsx', '.js'],
    },
    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
        new HtmlWebpackPlugin({ // plugin for inserting scripts into html
        }),
        new MiniCssExtractPlugin({ // plugin for controlling how compiled css will be outputted and named
            filename: "css/[name].css",
            chunkFilename: "css/[id].css"
        })
    ]
};