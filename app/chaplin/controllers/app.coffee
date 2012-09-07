Chaplin = require 'chaplin'

Mediator = require 'chaplin/core/Mediator'

Translate = require 'translate'

module.exports = class AppController extends Chaplin.Controller

    historyURL: (params) -> ''

    index: ->
        json =
            'select': [
                'publications.title',
                'publications.year',
                'publications.journal',
                'publications.pubMedId',
                'publications.authors.name'
            ]
            'from': 'Gene'
            'joins': [ 'publications.authors' ]

        Translate.toXML json, (err, xml) ->
            console.log xml