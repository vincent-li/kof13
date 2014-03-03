var Application = require('./application');

var {{ Models }}Controller = module.exports = function {{ Models }}Controller(init) {
    Application.call(this, init);

    init.before(load{{ Model }}, {
        only: ['show', 'edit', 'update', 'destroy']
    });
};

require('util').inherits({{ Models }}Controller, Application);

{{ Models }}Controller.prototype['new'] = function (c) {
    this.title = 'New {{ model }}';
    this.{{ model }} = new (c.{{ Model }});
    c.render();
};

{{ Models }}Controller.prototype.create = function create(c) {
    c.{{ Model }}.create(c.body.{{ Model }}, function (err, {{ model }}) {
        c.respondTo(function (format) {
            format.json(function () {
                if (err) {
                    c.send({code: 500, error: err});
                } else {
                    c.send({code: 200, data: {{ model }}.toObject()});
                }
            });
            format.html(function () {
                if (err) {
                    c.flash('error', '{{ Model }} can not be created');
                    c.render('new', {
                        {{ model }}: {{ model }},
                        title: 'New {{ model }}'
                    });
                } else {
                    c.flash('info', '{{ Model }} created');
                    c.redirect(c.pathTo.{{ models }});
                }
            });
        });
    });
};

{{ Models }}Controller.prototype.index = function index(c) {
    this.title = '{{ Models }} index';
    c.{{ Model }}.all(function (err, {{ models }}) {
        c.respondTo(function (format) {
            format.json(function () {
                c.send(err ? {
                    code: 500,
                    error: err
                }: {
                    code: 200,
                    data: {{ models }}
                });
            });
            format.html(function () {
                c.render({
                    {{ models }}: {{ models }}
                });
            });
        });
    });
};

{{ Models }}Controller.prototype.show = function show(c) {
    this.title = '{{ Model }} show';
    var {{ model }} = this.{{ model }};
    c.respondTo(function (format) {
        format.json(function () {
            c.send({
                code: 200,
                data: {{ model }}
            });
        });
        format.html(function () {
            c.render();
        });
    });
};

{{ Models }}Controller.prototype.edit = function edit(c) {
    this.title = '{{ Model }} edit';
    c.render();
};

{{ Models }}Controller.prototype.update = function update(c) {
    var {{ model }} = this.{{ model }};
    var self = this;

    this.title = '{{ Model }} edit';

    {{ model }}.updateAttributes(c.body.{{ Model }}, function (err) {
        c.respondTo(function (format) {
            format.json(function () {
                if (err) {
                    c.send({
                        code: 500,
                        error: {{ model }} && {{ model }}.errors || err
                    });
                } else {
                    c.send({
                        code: 200,
                        data: {{ model }}.toObject()
                    });
                }
            });
            format.html(function () {
                if (!err) {
                    c.flash('info', '{{ Model }} updated');
                    c.redirect(c.pathTo.{{ model }}({{ model }}));
                } else {
                    c.flash('error', '{{ Model }} can not be updated');
                    c.render('edit');
                }
            });
        });
    });

};

{{ Models }}Controller.prototype.destroy = function destroy(c) {
    this.{{ model }}.destroy(function (error) {
        c.respondTo(function (format) {
            format.json(function () {
                if (error) {
                    c.send({
                        code: 500,
                        error: error
                    });
                } else {
                    c.send({code: 200});
                }
            });
            format.html(function () {
                if (error) {
                    c.flash('error', 'Can not destroy {{ model }}');
                } else {
                    c.flash('info', '{{ Model }} successfully removed');
                }
                c.send("'" + c.pathTo.{{ models }} + "'");
            });
        });
    });
};

function load{{ Model }}(c) {
    var self = this;
    c.{{ Model }}.find(c.params.id, function (err, {{ model }}) {
        if (err || !{{ model }}) {
            if (!err && !{{ model }} && c.params.format === 'json') {
                return c.send({code: 404, error: 'Not found'});
            }
            c.redirect(c.pathTo.{{ models }});
        } else {
            self.{{ model }} = {{ model }};
            c.next();
        }
    });
}
