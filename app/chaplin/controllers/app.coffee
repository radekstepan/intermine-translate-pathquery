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

        xml = """
            <query view="Gene.publications.title Gene.publications.year Gene.publications.journal Gene.publications.pubMedId Gene.publications.authors.name">
                <join path="Gene.publications.authors" style="OUTER"/>
            </query> 
        """

        Translate.toJSON xml, (err, json) ->
            console.log json