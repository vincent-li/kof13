#!/usr/bin/env node

var app = module.exports = require('warlock').initSystem();

if (!module.parent) {
    var port = process.env.PORT || 3000;
    //console.log(wl);
   	app.listen(port);
    console.log("warlock server listening on port %d within %s environment", port, app.settings.env);
}
