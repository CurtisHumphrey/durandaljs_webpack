module.exports = (grunt) ->
  webpackDevConfig = require("./webpack.dev.config.js")

  grunt.initConfig
    clean:
      release: ["public/app/**/*","public/index.html"]
      
    webpack:
      options: require "./webpack.config.js"
      build: {}

    "webpack-dev-server":
      options:
        webpack: webpackDevConfig
        publicPath: ""
        contentBase: "public/"
      start:
        keepAlive: true
        webpack:
          devtool: "eval"
          debug: true
          hot: false,
          inline: true,
          historyApiFallback: true,
          stats: { colors: true },
          progress: true

    template:
      process_index:
        options:
          data: () ->
            r = 
              webpackManifest: JSON.stringify require "./public/app/chunk-manifest.json"
        files:
          'public/index.html': ['public/app/index.html']

    connect:
      build:
        options:
          port: 9002
          keepalive: true
          hostname: 'localhost'
          open: true
          base: 'public'

  require('load-grunt-tasks')(grunt)

  grunt.registerTask 'default', ['clean','webpack-dev-server:start']
  grunt.registerTask 'build', ['clean','webpack:build','template:process_index', 'connect:build']