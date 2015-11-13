/** helpful resources
  * 
  * https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95
  */


var fs = require('fs');
var url = require('url');
var path = require('path');
var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var GLOBALS = {
  'process.env.NODE_ENV': '"production"',
  '__DEV__': false
};

module.exports = {
  // Main entry directory and file
  entry: {
    vendor: [
            //durandal
             'knockout',
             'durandal/app',
             'durandal/system',
             'overrides/system',
             'overrides/composition',
             'overrides/views',
             'overrides/widget',
             'durandal/viewLocator',
             'durandal/plugins/router',
            //other libraries used often
             'alertify-js',
             'lodash',
             'knockout-amd-helpers',
             'bootstrap-timepicker',
             'knockout.punches'
            ],
    app: [
      // 'webpack/hot/dev-server',
      path.join(__dirname, 'app', 'main.coffee')
    ]
  },

  // // Output directories and file
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].page.js',
    publicPath: '/'
  },

  // // Custom plugins
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: Infinity,
    }),
    new ManifestPlugin(),
    new ChunkManifestPlugin({
      filename: "chunk-manifest.json",
      manifestVariable: "webpackManifest"
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new HtmlWebpackPlugin()
  ],

  module: {
    loaders: [
      { test: /\.html$/, loader: 'html' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.coffee$/, loader: "coffee-loader"}
    ]
  },

  resolve: {
    extensions: ['', '.coffee','.js', '.jsx', '.json'],

    modulesDirectories: [
      'node_modules',
      'app'
    ],

    root: path.join(__dirname, 'app'),

    alias: {
      'durandal': 'durandal/js',
      // 'plugins': 'durandal/js/plugins' #grunt webpack doesn't like 'plugins'
    }
  },

  externals: {
    jquery: 'jQuery'
  },

  devtool: 'source-map',
};
