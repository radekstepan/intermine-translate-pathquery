Chaplin = require 'chaplin'

Mediator = require 'chaplin/core/Mediator'

BodyView = require 'chaplin/views/Body'
XMLView = require 'chaplin/views/XML'
JSONView = require 'chaplin/views/JSON'

module.exports = class AppController extends Chaplin.Controller

    historyURL: (params) -> ''

    initialize: ->
        super

        @views ?= []
        @views.push new BodyView()

    index: ->
        @views.push (new XMLView()).render()
        @views.push (new JSONView()).render()