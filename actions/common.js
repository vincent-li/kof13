/**
 * Author: liwenqiang
 * Date:  2015-11-30 13:18:19
 */


/**
 *
 * @param _CS 全局 this
 * @param this.render 模版渲染函数
 * @param parse POST全局函数
 * @returns {*}
 */
module.exports = function(self) {

    //var ref = self.query.ref = self.request.header.referer || '/';

    return {
        pageList: function*(map, _hooks) {
            var page = self.query.p || 1;
            var perPage = self.query.perPage || 10;
            map = map || {};
            var bysort = self.query.sort || {
                '_id': -1
            }
            var count = yield D(self.controller_name).count(map).exec();
            var list = yield D(self.controller_name).find(map).sort(bysort).skip((page - 1) * perPage).limit(perPage).lean().exec();
            var d = {};
            d.data = list;
            d.count = count;
            d.page = F.page(page, count, perPage);

            //完成SQL后执行钩子
            if ('undefined' !== typeof _hooks) {
                d = _hooks(self, d, self.controller_name);
            }
            return d;
            // self.body = yield this.render('blog/list',d);

        }
    }
}
