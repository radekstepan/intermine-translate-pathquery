#!/usr/bin/env coffee
require.define 'translate': (exports, require, module) ->

    root = @

    # JSON to XML (using IMJS).
    module.exports.toXML = toXML = (json, xml) ->
        assert root.intermine?, 'Library `imjs` not found'

        if typeof json is 'string' then json = JSON.parse json

        try
            xml null, (new root.intermine.Query(json)).toXML()
        catch error
            xml error

    # XML to JSON (using SAX Parser).
    module.exports.toJSON = toJSON = (xml, json) ->
        assert root.sax?, 'Library `sax-js` not found'

        sax = root.sax.parser(true)

        query = {}
        attributes = {}

        sax.onattribute = (attr) ->
            switch attr.name
                when 'view'
                    attributes['select'] = attr.value.split(' ')
                else
                    attributes[attr.name] = attr.value

        sax.onopentag = (node) ->
            switch node.name
                when 'query'
                    query = attributes
                when 'constraint'
                    query['constraints'] ?= []
                    query['constraints'].push attributes
                when 'join'
                    query['joins'] ?= []
                    query['joins'].push attributes
                else
                    query[node.name] = attributes
            
            attributes = {}

        sax.onend = -> json null, JSON.stringify query

        sax.onerror = (e) -> json e

        sax.write(xml).close()