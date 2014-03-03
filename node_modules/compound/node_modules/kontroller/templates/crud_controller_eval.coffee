load 'application'

before 'load {{ model }}', ->
  {{ Model }}.find params.id, (err, {{ model }}) =>
    if err || !{{ model }}
      if !err && !{{ model }} && params.format == 'json'
        return send code: 404, error: 'Not found'
      redirect pathTo.{{ models }}
    else
      @{{ model }} = {{ model }}
      next()
, only: ['show', 'edit', 'update', 'destroy']

action 'new', ->
  @{{ model }} = new {{ Model }}
  @title = 'New {{ model }}'
  render()

action 'create', ->
  {{ Model }}.create body.{{ Model }}, (err, {{ model }}) =>
    respondTo (format) =>
      format.json ->
        if err
          send code: 500, error: {{ model }}.errors || err
        else
          send code: 200, data: {{ model }}.toObject()
      format.html =>
        if err
          flash 'error', '{{ Model }} can not be created'
          @{{ model }} = {{ model }}
          @title = 'New {{ model }}'
          render 'new'
        else
          flash 'info', '{{ Model }} created'
          redirect pathTo.{{ models }}

action 'index', ->
  {{ Model }}.all (err, {{ models }}) =>
    @{{ models }} = {{ models }}
    @title = '{{ Models }} index'
    respondTo (format) ->
      format.json ->
        send code: 200, data: {{ models }}
      format.html ->
        render {{ models }}: {{ models }}

action 'show', ->
  @title = '{{ Model }} show'
  respondTo (format) =>
    format.json =>
      send code: 200, data: @{{ model }}
    format.html ->
      render()

action 'edit', ->
  @title = '{{ Model }} edit'
  respondTo (format) =>
    format.json =>
      send code: 200, data: @{{ model }}
    format.html ->
      render()

action 'update', ->
  @{{ model }}.updateAttributes body.{{ Model }}, (err) =>
    respondTo (format) =>
      format.json =>
        if err
          send code: 500, error: @{{ model }}.errors || err
        else
          send code: 200, data: @{{ model }}
      format.html =>
        if !err
          flash 'info', '{{ Model }} updated'
          redirect path_to.{{ model }}(@{{ model }})
        else
          flash 'error', '{{ Model }} can not be updated'
          @title = 'Edit {{ model }} details'
          render 'edit'

action 'destroy', ->
  @{{ model }}.destroy (error) ->
    respondTo (format) ->
      format.json ->
        if error
          send code: 500, error: error
        else
          send code: 200
      format.html ->
        if error
          flash 'error', 'Can not destroy {{ model }}'
        else
          flash 'info', '{{ Model }} successfully removed'
        send "'" + path_to.{{ models }} + "'"
