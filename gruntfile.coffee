module.exports = (grunt) ->

  webpackDevConfig = require("./webpack.dev.config.js")

  grunt.initConfig
    clean:
      release: ["dist/**/*"]
      
    webpack:
      options: require "./webpack.config.js"
      build: {}

    "webpack-dev-server":
      options:
        webpack: webpackDevConfig
        publicPath: "/" + webpackDevConfig.output.publicPath
      start:
        keepAlive: true
        webpack:
          devtool: "eval"
          debug: true


  require('load-grunt-tasks')(grunt)

  grunt.registerTask 'default', ['webpack-dev-server:start']
  grunt.registerTask 'build', ['clean','webpack:build']