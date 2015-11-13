define (require) ->
  ko     = require 'knockout'
  app    = require 'durandal/app'
  system = require 'durandal/system'
  widget = require 'durandal/plugins/widget'

  # Durandal core overrides - Required for Webpack
  require 'overrides/system'
  require 'overrides/composition'
  require 'overrides/views'
  require 'overrides/widget'

  viewLocator = require 'durandal/viewLocator'
  alertify    = require 'alertify-js'
  _           = require 'lodash'
  
  require 'knockout-amd-helpers'
  require 'bootstrap-timepicker'
  # #require 'helpers/ko_extensions'
  require 'knockout.punches'
  
  # #require 'helpers/ko_filters'
  require 'firebase'

  # Debuging path access
  if window.fb
    console.log "setting up firebase debuging"
    old_get = fb.core.Repo.prototype.addEventCallbackForQuery
    fb.core.Repo.prototype.addEventCallbackForQuery = (query, eventRegistration) ->
      if _.isPlainObject eventRegistration.callbacks_
        type = _.first _.keys(eventRegistration.callbacks_)
      else
        type = 'value'

      console.log "get " + query.path.pieces_.join('/') + " as " + type
      old_get.call @, query, eventRegistration

    old_set = fb.core.Repo.prototype.setWithPriority
    fb.core.Repo.prototype.setWithPriority = (path, newVal, newPriority, onComplete) ->
      console.log "set " + path.pieces_.join '/'
      old_set.call @, path, newVal, newPriority, onComplete
  else
    console.log "firebase not setup for debug"


  router = require 'durandal/plugins/router'
  router.install {}

  widgets = require 'widgets/index'
  widget.install
    kinds: Object.keys(widgets)


  ko.punches.enableAll()


  ko.amdTemplateEngine.defaultPath = "/dev/views";
  ko.amdTemplateEngine.defaultSuffix = ".html";
  ko.amdTemplateEngine.defaultRequireTextPluginName = "text";

  alertify.debug()

  system.debug true
  
  app.title = "The Everyday Chef Prototype"

  # overwrite to our format
  viewLocator.convertModuleIdToViewId = (moduleID) ->
    return '/dev/' + moduleID;

  app.start().then ->
    return app.setRoot require('./shell')

  
  return