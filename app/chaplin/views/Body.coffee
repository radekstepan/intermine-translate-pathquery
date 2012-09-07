Chaplin = require 'chaplin'

Mediator = require 'chaplin/core/Mediator'

module.exports = class BodyView extends Chaplin.View

    container:       'body'
    containerMethod: 'html'
    autoRender:      true

    getTemplateFunction: -> require 'chaplin/templates/body'