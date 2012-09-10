Chaplin = require 'chaplin'

Mediator = require 'chaplin/core/Mediator'

@t = Translate = require 'translate'

module.exports = class EditorView extends Chaplin.View

    containerMethod: 'html'

    # Save the change timeout here.
    timeout: null

    getTemplateFunction: -> require 'chaplin/templates/editor'

    # Extend dispose by getting rid of internal timeout.
    dispose: ->
        if @timeout? then clearTimeout @timeout
        delete @timeout

        super

    # Translate one language to another.
    translate: (text, fce) =>
        if text? and fce?
            Translate[fce] text, (err, output) =>
                unless err
                    @session.setValue output
                else
                    console.log err.message

    # Is this editor in focus?
    inFocus: -> $(@container).hasClass 'ace_focus'

    # Set editor height.
    setHeight: ->
        # Set height of the containers.
        height = $(window).height() - $('header h1').height() - 30 # margin...
        $(@container).css 'height', height
        $(@container).find('.ace_editor').css 'height', height

    afterRender: ->
        super

        # Render.
        editor = ace.edit @container[1...]
        # Theme
        editor.setTheme "ace/theme/monokai"
        
        @session = editor.getSession()
        renderer = editor.renderer
        
        # JavaScript mode.
        @session.setMode @mode
        
        # No print margin.
        @session.setUseWrapMode false
        @session.setWrapLimitRange null, null
        renderer.setPrintMarginColumn 80
        renderer.setShowPrintMargin false

        # Wrap the long lines.
        @session.setUseWrapMode true

        @setHeight()

        # Events.
        @session.on 'change', (obj) =>
            # Only emit if we are in focus.
            if @inFocus()
                if @timeout? then clearTimeout @timeout

                @timeout = setTimeout (=>
                    # Say which function to apply on which text.
                    Mediator.publish @fce, @session.getValue()
                ), 500

        Mediator.subscribe @our, (text) =>
            # Do not edit us if we are in focus.
            if not @inFocus()
                # Use our Translate fce.
                @translate text, @our

        $(window).resize => @setHeight()