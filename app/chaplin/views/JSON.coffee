EditorView = require 'chaplin/views/Editor'

Mediator = require 'chaplin/core/Mediator'

module.exports = class JSONView extends EditorView

    # Ace editor mode.
    mode: 'ace/mode/json'

    # Which function to use when translating.
    fce: 'toXML'
    our: 'toJSON'
    
    container: '#json'

    afterRender: ->
        super

        @session.setValue """
            {
                "name": "",
                "model": "genomic",
                "select": [
                    "Gene.secondaryIdentifier",
                    "Gene.interactions.role",
                    "Gene.interactions.interactingGenes.primaryIdentifier",
                    "Gene.interactions.interactingGenes.secondaryIdentifier",
                    "Gene.interactions.name",
                    "Gene.interactions.type.name",
                    "Gene.interactions.confidenceText",
                    "Gene.interactions.dataSets.dataSource.name",
                    "Gene.interactions.experiment.publication.pubMedId"
                ],
                "longDescription": "Show all known interactions between two specific genes. (Data Source: IntAct, BioGrid). ",
                "sortOrder": "Gene.secondaryIdentifier asc",
                "constraintLogic": "A and C and B",
                "constraints": [
                    {
                        "path": "Gene.interactions.interactionType",
                        "code": "B",
                        "op": "=",
                        "value": "physical"
                    },
                    {
                        "path": "Gene",
                        "code": "A",
                        "op": "LOOKUP",
                        "value": "wg",
                        "extraValue": ""
                    },
                    {
                        "path": "Gene.interactions.interactingGenes",
                        "code": "C",
                        "op": "LOOKUP",
                        "value": "CG14487",
                        "extraValue": ""
                    }
                ]
            }
        """