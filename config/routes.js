exports.routes = function (map) {
    // the defalute link is root, will go the index.html in the webapp folder
    // you can change the router use map api, for examples map.get()|map.post()|map.delete()
    map.root('welcome#welcome');

    //获取request token
    map.get('/player/playerInfo.json','welcome#getPlayerInfo');

    map.post('/player/login','welcome#login');

	map.post('/player/regist', 'player#create');
};
