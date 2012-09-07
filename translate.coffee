#!/usr/bin/env coffee

require 'colors'
sax = require('sax').parser(true)

xml = """
<query name="" model="genomic" view="Gene.symbol Gene.secondaryIdentifier Gene.goAnnotation.ontologyTerm.name Gene.interactions.interactingGenes.primaryIdentifier Gene.interactions.interactingGenes.symbol Gene.interactions.dataSets.name Gene.interactions.experiment.name" longDescription="List all D. melanogaster genes that are associated with a certain GO term and that have been found to interact with a specific gene. (Data Source: GO, BioGRID, IntAct)." constraintLogic="E and A and C and B">
  <constraint path="Gene.organism.name" code="E" op="=" value="Drosophila melanogaster"/>
  <constraint path="Gene.goAnnotation.qualifier" code="A" op="IS NULL"/>
  <constraint path="Gene.goAnnotation.ontologyTerm" type="GOTerm"/>
  <constraint path="Gene.goAnnotation.ontologyTerm.name" code="C" op="=" value="transcription*"/>
  <constraint path="Gene.interactions.interactingGenes" code="B" op="LOOKUP" value="gl" extraValue="D. melanogaster"/>
</query>
"""

query = {}
attributes = {}

# an attribute.  attr has "name" and "value"
sax.onattribute = (attr) ->
    #console.log 'attribute'.yellow, attr.name.bold, attr.value

    switch attr.name
        when 'view'
            attributes['select'] = attr.value.split(' ')
        else
            attributes[attr.name] = attr.value

# opened a tag. node has "name" and "attributes"
sax.onopentag = (node) ->
    #console.log 'opentag'.blue, node.name.bold, node.attributes

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

# parser stream is done, and ready to have more stuff written to it.
sax.onend = ->
    #console.log 'done'.green

    console.log JSON.stringify query

    query = {}
    attributes = {}

# an error happened.
sax.onerror = (e) ->
    #console.log "error".red, e

sax.write(xml).close()