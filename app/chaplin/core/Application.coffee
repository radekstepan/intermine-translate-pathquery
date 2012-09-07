Chaplin = require 'chaplin'

Mediator = require 'chaplin/core/Mediator'

routes = require 'chaplin/core/routes'

# The application object.
module.exports = class App extends Chaplin.Application

    title: 'InterMine Translate PathQuery'

    data: {}

    initialize: ->
        super

        # Initialize core components
        @initDispatcher
            'controllerPath':   'chaplin/controllers/'
            'controllerSuffix': ''

        # So that nice Controller switching works...
        @layout = new Chaplin.Layout {@title}

        # Register all routes and start routing
        @initRouter routes

        # Freeze the application instance to prevent further changes
        Object.freeze? @