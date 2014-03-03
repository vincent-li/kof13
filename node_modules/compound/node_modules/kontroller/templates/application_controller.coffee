Application = module.exports = (init) ->
    init.before 'protect from forgery', (c) ->
        c.protectFromForgery '{{ SECRET }}'
