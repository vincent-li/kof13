Application = require './application'

load{{ Model }} = (c) ->
  c.{{ Model }}.find c.params.id, (err, {{ model }}) =>
    if  err || !{{ model }}
      if !err && !{{ model }} && c.params.format == 'json'
        return c.send code: 404, error: 'Not found'
      c.redirect c.pathTo.{{ models }}
    else
      @{{ model }} = {{ model }}
      c.next()

{{ Models }}Controller = module.exports = (init) ->
    Application.call this, init

    init.before load{{ Model }}, only: ['show', 'edit', 'update', 'destroy']

require('util').inherits {{ Models }}Controller, Application

#
# GET {{ models }}/new
#
{{ Models }}Controller.prototype['new'] = (c) ->
    @title = 'New {{ model }}'
    @{{ model }} = new (c.{{ Model }})
    c.render()

#
# POST {{ models }}
#
# respond to:
#   - html (default)
#   - json
#
{{ Models }}Controller.prototype.create = (c) ->
  c.{{ Model }}.create c.body.{{ Model }}, (err, {{ model }}) =>
    c.respondTo (format) ->
      format.json ->
        if err
          c.send code: 500, error: {{ model }} && {{ model }}.errors || err
        else
          c.send code: 200, data: {{ model }}.toObject()
      format.html =>
        if err
          @{{ model }} = {{ model }}
          @title = 'New {{ model }}'
          c.flash 'error', '{{ Model }} can not be created'
          c.render 'new'
        else
          c.flash 'info', '{{ Model }} created'
          c.redirect c.pathTo.{{ models }}

#
# GET {{ models }}
#
# respond to:
#   - html (default)
#   - json
#
{{ Models }}Controller.prototype.index = (c) ->
  c.{{ Model }}.all (err, {{ models }}) ->
    c.respondTo (format) ->

      format.json ->
        c.send code: 200, data: {{ models }}

      format.html ->
        c.render {{ models }}: {{ models }}, title: '{{ Models }} index'

#
# GET {{ models }}/:id
#
# respond to:
#   - html (default)
#   - json
#
{{ Models }}Controller.prototype.show = (c) ->
  c.respondTo (format) =>
    format.json =>
      c.send code: 200, data: @{{ model }}

    format.html ->
      c.render title: '{{ Model }} show'

#
# GET {{ models }}/:id/edit
#
{{ Models }}Controller.prototype.edit = (c) ->
    this.title = '{{ Model }} edit'
    c.render()

#
# PUT {{ models }}/:id
#
# respond to:
#   - html (default)
#   - json
#
{{ Models }}Controller.prototype.update = (c) ->
  @title = '{{ Model }} edit'

  @{{ model }}.updateAttributes c.body.{{ Model }}, (err) =>
    c.respondTo (format) =>

      format.json =>
        if err
          c.send
            code: 500
            error: @{{ model }} && @{{ model }}.errors || err
        else
          c.send
            code: 200
            data: @{{ model }}.toObject()

      format.html =>
        unless err
          c.flash 'info', '{{ Model }} updated'
          c.redirect c.pathTo.{{ model }}(@{{ model }})
        else
          c.flash 'error', '{{ Model }} can not be updated'
          c.render 'edit'

#
# DELETE {{ models }}/:id
#
# respond to:
#   - html (default)
#   - json
#
{{ Models }}Controller.prototype.destroy = (c) ->
  @{{ model }}.destroy (error) ->
    c.respondTo (format) ->

      format.html ->
        if error
          c.flash 'error', 'Can not destroy {{ model }}'
        else
          c.flash 'info', '{{ Model }} successfully removed'
          c.send "'" + c.pathTo.{{ models }} + "'"

      format.json ->
        if error
          c.send code: 500, error: error
        else
          c.send code: 200
