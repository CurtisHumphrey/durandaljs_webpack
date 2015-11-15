/** helpful resources
  * 
  * https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95
  */

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

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
    path: 'public/app/',
    filename: '[name].page.js',
    chunkFilename: '[name].page.js',
    publicPath: ''
  },

  // // Custom plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.template.html',
      inject: true,
      filename: 'index.html'
    })
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

  devServer: {
    contentBase: path.join(__dirname, 'public'),
    hot: false,
    inline: true,
    historyApiFallback: true,
    stats: { colors: true },
    progress: true
  }
};
