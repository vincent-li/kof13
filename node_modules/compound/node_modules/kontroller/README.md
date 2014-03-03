## About

Controllers used in CompoundJS. Could be used separately. This package provides
efficient way of describing controllers, it works insanely fast (sometimes
even faster then manually written express controller). Optimized for high
performance.

## Installation

    npm install kontroller

## Basic usage (ExpressJS example)

    // create some controller
    var Driver = require('kontroller').BaseController.constructClass();

    // define action
    Driver.actions.accelerate = function accelerate(c) {
        c.send('accelerating!');
    };

    // and another one
    Driver.actions.brake = function brake(c) {
        c.send('braking!');
    };

    // now let's create express app
    var express = require('express);
    var app = express();

    // and map routes to controller
    app.get('/speedup', Driver('accelerate'));
    app.get('/slowdown', Driver('brake'));

    // run, test
    app.listen(3000);

## Context-free controllers

There are a lot of hidden features in your new controller. You can rewrite it in
compoundjs-style:

    before(think, {only: 'accelerate'});

    action('accelerate', function () {
        send('accelerating!');
    });

    action('brake', function () {
        send('braking!');
    });

    function think() {
        // think 1 second before accelerate
        setTimeout(next, 1000);
    }

And use as compoundjs does it:

    // create blank controller
    var Driver = BaseController.constructClass('Driver');

    // instantiate and configure
    var ctl = new Driver;
    ctl.build(code); // code is string, containing code of controller

    // feed to express
    app.get('/speedup', Driver('accelerate'));
    app.get('/slowdown', Driver('brake'));

## Respond to specific format:

    action(function index() {
        var fruits = this.fruits = ['apple', 'banana', 'kiwi'];
        respondTo(function (format) {
            format.html(render);
            format.json(function () {
                send(fruits);
            });
        });
    });

Extend list of formats:

    require('kontroller').Helpers.respondToFormats.push('gif', 'png', 'jpg');

And then you can use it:

    action(function image() {
        respondTo(function (format) {
            format.png(renderPNG);
            format.jpg(renderJPG);
            format.git(renderGIF);
        });
        // note: methods renderGIF, renderJPG, renderPNG aren't part of
        // kontroller, this is just some named functions
        // used for example
    });

## Flow control

You can use hooks for specific actions / all actions

    before(function () {
        next(); // call next to get to the next hook/action
    });

Next hook only will be executed when action is `specialCase`:

    before(function doSmthSpecial() {
        next();
    }, {only: 'specialCase'});

Next hook only will be executed when action is not `publicResource`:

    before(function authorizeUser() {
        if (!session.user) {
            redirect('/login');
        } else {
            next();
        }
    }, {except: 'publicResource'});

You also can pass array of strings as `only` and `except` settings when you need
to hook multiple actions:

    // load resource before actions: show, edit, update, destroy
    before(loadResource, {only: ['show', 'edit', 'update', 'destroy']});

    // only blahBlah if action is not pipa or moka
    before(blahBlah, {except: ['pipa', 'moka']});

## Controllers pool

Controllers produced via `kontroller` designed to be fast as possible. Every
controller instance could be reused multiple times (to save time for it's
instantiation and reduce memory usage). This trick allows to save same
performance level as it would be for just function, and not separate object

The only problem here in concurrent requests. Obviously, concurrent requests
should be handled using different controller instances, so we have pool for
controllers. When request comes, firts of all we trying to pull controller from
the pool, and only if pool is empty - creating new instance. After request
handling is completed - controller instance pushed back to pool.

# MIT License

    Copyright (C) 2011 by Anatoliy Chakkaev

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
