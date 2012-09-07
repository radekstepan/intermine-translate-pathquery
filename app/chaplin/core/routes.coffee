###
The routes for the application. This module returns a function.
@param {function} match Method of the Router.
###
module.exports = (match) ->
    match '', 'app#index'