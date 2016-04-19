module.exports = {
    name : 'pages',//可以指定数据库中的collection
    type: {
        config: String,
        type: String,//
        gmt_create: {
            type: Number,
            default: F.date.time()
        }
    },
    validate: function(model, schema) {

    }
}
