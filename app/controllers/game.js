var tables = ['room','table1','table2'];
action('initRoom', function(){
    if(app && app.wapp){
        var wapp = app.wapp;
        for (var i = tables.length - 1; i >= 0; i--) {
            wapp.createServer(tables[i]);
        };
    }
    send({
        tables : tables,
        info : {
            ok : true,
            msg : ''
        }
    });
});