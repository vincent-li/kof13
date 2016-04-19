/**
 * Created by liwenqiang on 20151130
 */
module.exports = {
    getLoginUser: function*() {
        var q = this.request.query;
        // console.log('=== request param ==>'+JSON.stringify(q));
        if (q && q.code) {
            var getUserUrl = 'http://login.qima-inc.com/oauth2/user?access_token=' + q.code;
            var userInfoResp = yield request(getUserUrl);
            // var userInfoResp = yield request('http://login.qima-inc.com/users/self');
            var body = JSON.parse(userInfoResp.body);
            if (body && body.code === 1000 && body.msg === 'ok') {
                var data = body.value;
                var cookieuser = {
                    id: data.id,
                    username: data.username
                };
                G.user = cookieuser;
                this.cookies.set('have_you_in_youzan', JSON.stringify(cookieuser));
                this.redirect('/');
            } else {
                this.redirect(C.authurl);
            }
        } else {
            this.redirect(C.authurl);
        }
    },
    logout: function*() {
        this.cookies.set('have_you_in_youzan', '');
        G.user = {};
        this.redirect('/');
    }
}
