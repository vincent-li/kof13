module.exports = {
    name : 'activity',//可以指定数据库中的collection
    type: {
        name: String,
        config: String,
        status: String, //init runing stop delete
        url: String,
        type:String,//
        createtime: {
            type: Number,
            default: F.date.time()
        }
    },
    validate: function(model, schema) {

    }
}
