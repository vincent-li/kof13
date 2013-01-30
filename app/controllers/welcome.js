action('welcome', function () {
    redirect('/index.html');
});

action('userInfo', function () {
    // console.log(req);
    var f = 'userInfoCallback',
        csrf = req.csrfToken,
        returnData = {
            info : {
                ok : csrf ? true : false,
                msg : ''
            },
            data : {
                csrfId : csrf ? csrf : ''
            }
        };
        //r = ['<script>', f, '({info : { ok : false', ', msg : ''}, data : { crsfId : ', '}})</script>'];
    // console.log(csrf);
    send(f + '(' + JSON.stringify(returnData) + ')');
});