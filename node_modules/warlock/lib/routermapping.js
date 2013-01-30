/***********************************************************************************\
*   本类旨在链接router和anction，也就是通过找到相应的controller
*中定义的action和router中定义的map.post('/server/delete', 'servers#destroy');
*使得二者可以挂载，让程序请求 /server/delete 可以之行 servers.js 中的destroy方法
\***********************************************************************************/

function RouterMapping(root) {
    this.root = root || app.root;
};

RouterMapping.config = {
    subdomain: {
        tld: 2
    }
};

RouterMapping.prototype.uniCaller = function (ns, controller, action, params) {
    return function (req, res, next) {

        var subdomain = req.headers.host
            .split('.')
            .slice(0, -1 * RouterMapping.config.subdomain.tld)
        req.subdomain = subdomain.join('.');

        if (params && params.subdomain) {
            if (params.subdomain !== req.subdomain) {
                if (params.subdomain.match(/\*/)) {
                    var matched = true;
                    params.subdomain.split('.').forEach(function (part, i) {
                        if (part === '*') return;
                        if (part !== subdomain[i]) matched = false;
                    });

                    if (!matched) return next(); // next route
                } else return next();
            }
        }

        var ctl = this.loadController(ns + (controller || req.params.controller));
        if (app.disabled('model cache')) {
            // TODO: reloadModels should work without any params
            // it just should remember all paths
            // called previously with
            app.reloadModels(this.root + '/app/models/');
        }
        ctl.perform(action || req.params.action, req, res, next);
    }.bind(this);
};

RouterMapping.prototype.loadController = function (controllerFullName) {
    if (app.enabled('commonjs ctl')) {
        return happ.controller.loadNew(controllerFullName, this.root);
    } else {
        return happ.controller.load(controllerFullName, this.root);
    }
};

module.exports = RouterMapping;