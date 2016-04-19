/*
 * Author: yPangXie <pangxie.wdy@gmail.com>
 * Date: 2015-06-28
 * Des: 帮助方法
 */

"use strict";

const qs = require('querystring');
const debug = require('debug')('koa-combo-parse:util');

module.exports = {
    /* 提取query中_mcss字段和combo的元素 */
    queryHandler: function(query) {
        var queryObj = {q: ''};
        if(!query) {
            return queryObj;
        }

        var qArray = query.split('&');
        var qObj = qs.parse(query);
        for(var i = 0, len = qArray.length; i < len; i++) {
            var queryItem = decodeURIComponent(qArray[i]).replace('=', '');
            if(/^\?/g.test(queryItem)) {
                debug('matched query: %s', queryItem) ;
                queryObj.q = queryItem;
                break;
            }
        }

        queryObj.m = qObj._mcss == 'true' || qObj._mcss == 'y';
        return queryObj;
    }
};