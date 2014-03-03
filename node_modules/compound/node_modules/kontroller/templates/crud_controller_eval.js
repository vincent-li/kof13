load('application');

before(load{{ Model }}, {
    only: ['show', 'edit', 'update', 'destroy']
    });

action('new', function () {
    this.title = 'New {{ model }}';
    this.{{ model }} = new {{ Model }};
    render();
});

action(function create() {
    {{ Model }}.create(req.body.{{ Model }}, function (err, {{ model }}) {
        respondTo(function (format) {
            format.json(function () {
                if (err) {
                    send({code: 500, error: {{ model }} && {{ model }}.errors || err});
                } else {
                    send({code: 200, data: {{ model }}.toObject()});
                }
            });
            format.html(function () {
                if (err) {
                    flash('error', '{{ Model }} can not be created');
                    render('new', {
                        {{ model }}: {{ model }},
                        title: 'New {{ model }}'
                    });
                } else {
                    flash('info', '{{ Model }} created');
                    redirect(path_to.{{ models }});
                }
            });
        });
    });
});

action(function index() {
    this.title = '{{ Model }}s index';
    {{ Model }}.all(function (err, {{ models }}) {
        switch (params.format) {
            case "json":
                send({code: 200, data: {{ models }}});
                break;
            default:
                render({
                    {{ models }}: {{ models }}
                });
        }
    });
});

action(function show() {
    this.title = '{{ Model }} show';
    switch(params.format) {
        case "json":
            send({code: 200, data: this.{{ model }}});
            break;
        default:
            render();
    }
});

action(function edit() {
    this.title = '{{ Model }} edit';
    switch(params.format) {
        case "json":
            send(this.{{ model }});
            break;
        default:
            render();
    }
});

action(function update() {
    var {{ model }} = this.{{ model }};
    this.title = 'Edit {{ model }} details';
    this.{{ model }}.updateAttributes(body.{{ Model }}, function (err) {
        respondTo(function (format) {
            format.json(function () {
                if (err) {
                    send({code: 500, error: {{ model }} && {{ model }}.errors || err});
                } else {
                    send({code: 200, data: {{ model }}});
                }
            });
            format.html(function () {
                if (!err) {
                    flash('info', '{{ Model }} updated');
                    redirect(path_to.{{ model }}({{ model }}));
                } else {
                    flash('error', '{{ Model }} can not be updated');
                    render('edit');
                }
            });
        });
    });
});

action(function destroy() {
    this.{{ model }}.destroy(function (error) {
        respondTo(function (format) {
            format.json(function () {
                if (error) {
                    send({code: 500, error: error});
                } else {
                    send({code: 200});
                }
            });
            format.html(function () {
                if (error) {
                    flash('error', 'Can not destroy {{ model }}');
                } else {
                    flash('info', '{{ Model }} successfully removed');
                }
                send("'" + path_to.{{ models }} + "'");
            });
        });
    });
});

function load{{ Model }}() {
    {{ Model }}.find(params.id, function (err, {{ model }}) {
        if (err || !{{ model }}) {
            if (!err && !{{ model }} && params.format === 'json') {
                return send({code: 404, error: 'Not found'});
            }
            redirect(path_to.{{ models }});
        } else {
            this.{{ model }} = {{ model }};
            next();
        }
    }.bind(this));
}
