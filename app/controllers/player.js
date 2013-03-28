action('create',function(){
    var player = req.body || {};
    Player.find(player, function(err,p){
        if(err){
            console.log(err);
        }else{
            if(p){
                send({
                    ok : false,
                    msg : '注册失败，用户已经存在！'
                });
            }else{
                Player.create(player,function(err,p){
                    if(err){
                        console.log(err);
                    }else{
                        if(p && p.password){
                            p.removeAttribute('password');
                        }
                        send({
                            info : {
                                ok : true,
                                msg : '注册成功'
                            }
                            player : p
                        });
                    }
                });
            }
        }
    });
});