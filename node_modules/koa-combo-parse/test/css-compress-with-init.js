/*
 * Author: yPangXie <pangxie.wdy@gmail.com>
 * Date: 2015-06-26
 * Des: koa中间件, 解析combo的URL: 通过初始化中间件配置css压缩
 */

"use strict";

const path = require('path');
const request = require('supertest');
const app = require('koa')();
const Static = require('koa-static');
const comboParse = require('../');

describe("CSS compress with middleware param setting(miniCSS equals true) for combo url:", function() {
    app.use(comboParse({
        miniCSS: true,
        base: path.resolve(__dirname, './files')
    }));

    app.use(Static(path.resolve(__dirname, './files')));

    it("Response data from /??a.css,b.css&_mcss=true should be .a,.b{margin:0}", function(done) {
        request(app.listen()).get('/??a.css,b.css&_mcss=true').expect('.a,.b{margin:0}', done);
    });

    it("Response data from /??a.css,b.css&_mcss=y should be .a{margin:0}.b{margin:0}", function(done) {
        request(app.listen()).get('/??a.css,b.css&_mcss=y').expect('.a,.b{margin:0}', done);
    });

    it("Response data from /??a.css,b.css&_mcss=1 should be .a,.b{margin:0}", function(done) {
        request(app.listen()).get('/??a.css,b.css').expect('.a,.b{margin:0}', done);
    });

    it("Response data from /??a.css,b.css should be .a,.b{margin:0}", function(done) {
        request(app.listen()).get('/??a.css,b.css').expect('.a,.b{margin:0}', done);
    });
});