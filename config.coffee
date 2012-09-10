exports.config =
    files:
        javascripts:
            joinTo:
                'js/app.js': /^app\/chaplin/
                'js/vendor.js': /^vendor\/js/
            order:
                before: [
                    'vendor/js/jquery-1.7.2.js',
                    'vendor/js/underscore-1.3.3.js',
                    'vendor/js/backbone-0.9.2.js'
                ]
                after: [ 'vendor/js/*' ]

        stylesheets:
            joinTo:
                'css/app.css': /^app\/styles/
                'css/vendor.css': /^vendor\/css/
            order:
                before: [ 'vendor/css/foundation3.css' ]

        templates:
            joinTo: 'js/app.js'

    server:
        path: 'server.coffee'
        port: 1160
        run: yes