module.exports = {
    _extend:{
        Message : require('./common')
    },
    getActivityList: function*(){
        var msgs = yield this.Message.list();
        // this.redirect('/');
        this.body = JSON.stringify({
            data : {
                msgs : msgs,
                sync : F.date.time()
            },
            success: true,
            error : '',
            errorMsg : ''
        });
    },
    createActivity: function*() {
        var q = yield this.request.query;
        q.createTime = F.date.time();
        this.body = JSON.stringify({
            data: {},
            success: true,
            error:'',
            errorMsg:''
        });
    }
}
