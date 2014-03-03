(function($){
    //管理链接
    window.conns = [];

    var host = "ws://localhost:3000";//web socket 连接对象

    function initRoom(){

        if(window['MozWebSocket'] || WebSocket){

        }else{
            $('.container').html('<p>当前浏览器不支持websocket,请更换更高级的浏览器,推荐使用chrome</p>');
        }
        // debugger;
        $.ajax({
            url : '/battle/room',
            type : 'GET',
            dataType : 'JSON',
            success : function(data){
                
            },
            error : function(){

            }
        });
    }

    initRoom();

    function connetRoom(){
        //获取当前房间的信息和情况，包括同步各种信息。
        var WebSocketServer = window['MozWebSocket'] ? MozWebSocket : WebSocket;

        if(!window.roomconn){
            window.wsconn= new WebSocketServer(host,'room');
        }

        var _ss = window.roomconn;

        _ss.onopen = function(){  
            if(_ss && _ss.readyState==1){
                _ss.send(JSON.stringify(self.params));
            }
        }  
  
        _ss.onmessage = function(data){
            console.log(data); 
            // terminal.html(self.messages.join(''));  
        }  
  
        _ss.onclose = function(){ 
            console.log('网络连接中断 (Closed)'); 
            // terminal.html(self.messages.join(''));   
        }   
    }
    
})(jQuery);