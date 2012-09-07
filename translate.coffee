#!/usr/bin/env coffee

require 'colors'
imjs = require('imjs')
sax = require('sax').parser(true)

json =
    "select": [
        "publications.title",
        "publications.year",
        "publications.journal",
        "publications.pubMedId",
        "publications.authors.name"
    ],
    "from": "Gene",
    "joins": [ "publications.authors" ]

xml = """
<query model="genomic" view="Gene.publications.title Gene.publications.year Gene.publications.journal Gene.publications.pubMedId">
  <join path="Gene.publications.authors" style="OUTER"/>
</query>
"""

# JSON to XML.
exports.toXML = toXML = (json, xml) ->
    # Objectify.
    if typeof json is 'string' then json = JSON.parse json

    try
        xml null, (new imjs.Query(json)).toXML()
    catch error
        xml error

# XML to JSON.
exports.toJSON = toJSON = (xml, json) ->
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

toXML json, (err, xml) ->
    throw err if err
    console.log xml