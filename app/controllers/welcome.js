before('protect from forgery', function () {
  protectFromForgery('b8e97a1d34ec31302a2f309b11b4ded50b907fd5');
});

action('welcome', function () {
    redirect('/index.html');
});

action('getPlayerInfo', function () {
    var f = req.query.callback || 'setPlayerInfo';
    var csrf = req.csrfToken;
    var p = req.session.loginPlayer;
    if(p && p.password){
        p.removeAttribute('password');
    }
    var returnData = {
        info : {
            ok : csrf ? true : false,
            msg : ''
        },
        player : {
            csrfId : csrf ? csrf : '',
            loginPlayer : p
        }
    };
    console.log('++++++');
    send(f + '(' + JSON.stringify(returnData) + ')');
});

action('login',function(){
    var player = req.body || {};
    if(player.loginId && player.password){
        Player.all({name:player.loginId, password : player.password}, function (err, ps) {
            if (err) {
                console.log('find err');
            } else {
                if(ps && ps.length===1){
                    var p = ps[0];
                    if(p && p.password){
                        p.removeAttribute('password');
                    }
                    req.session.loginPlayer = p;
                    send({
                        info : {
                            ok : true,
                            msg : ''
                        },
                        player : ps[0]
                    });
                }else{
                    send({
                        info : {
                            ok : false,
                            msg : '用户名密码错误，请重新输入!'
                        }
                    });
                }
            }
        });
    }
});

function getCsrfToken(){
    return require('crypto').createHash('sha1').update(Math.random().toString()).digest('hex');
}