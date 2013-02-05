var bs = {
    'name' : 'bashao1',
    'email' : 'vincent1.liwq@gmail.com',
    'password' : 'aaa111'
};

before(loadPlayer, {only : ['init']});

function loadPlayer() {
    Player.all({name:'bashao1'}, function (err, player) {
        console.log(arguments);
        if (err) {
            console.log('find err');
        } else {
            this.player = player;
            next();
        }
    }.bind(this));
}
// console.log(Player);

action('init', function(){
    if(this.player){
        send({
            info : {
                ok : false,
                msg : 'player have in'
            }
        });
    }else{
        Player.create(bs, function (err, p) {
            if (err) {
                send({
                    info : {
                        ok : false,
                        msg : err
                    }
                });
            } else {
                send({
                    player : p,
                    info : {
                        ok : true,
                        msg : '创建成功'
                    }
                });
                
            }
        });
    }
});