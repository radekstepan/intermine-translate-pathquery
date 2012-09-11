#!/usr/bin/env coffee

flatiron = require 'flatiron'
connect  = require 'connect'

app = flatiron.app
app.use flatiron.plugins.http,
    'before': [
        # Have a nice favicon.
        connect.favicon()
        # Static file serving.
        connect.static "./public"
    ]

app.start process.env.OPENSHIFT_INTERNAL_PORT or 1160, process.env.OPENSHIFT_INTERNAL_IP, (err) ->
    throw err if err