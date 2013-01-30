var WebSocketServer = require('websocket').server;

function Websocket() {
    global.wapp  = this;
    this.conns = {};
    this.count   = 0;
    this.ipIndex = [];
    this.wssId = 0;
}

exports.initWebsocket = function(){
    var wsk = new Websocket();
    return wsk;
}

Websocket.prototype.createServer = function(acceptName){
    var wss = new WebSocketServer({
        httpServer: app,
        autoAcceptConnections: false,
        id : wapp.wssId++
    });
    initConnection(wss,acceptName);
}

function initConnection(wss,acceptName){
    var connections = [];
    var commands = [];
    wss.on('request', function(request) {
        var connection = request.accept(acceptName, request.origin);
        // 当前注册的connection 以访问ip为key，保存到wpp对象中。
        var ipKey = connection.remoteAddress;
        //console.log(connection);
        var conn = {
            wss : wss,
            conn : connection,
            ip : ipKey,
            acceptName : acceptName,
            type : type //'fighting'--一场战斗，此connect会在战斗结束所有人离开后自动销毁。
                        //'battlefield'--战场，相当于游戏大厅的概念，这个connect可以用来维护一些比较重要的实时连接，比如通知。
        }
        wapp.conns[ipKey] =  connection;
        
        // console.log(wpp);
        console.log(connection.remoteAddress + " connected - Protocol Version " + connection.websocketVersion);
        
        // Send all the existing canvas commands to the new client
        // connection.sendUTF(JSON.stringify({
        //     msg: "initCommands"
        // }));
        
        // Handle closed connections
        connection.on('close', function() {
            console.log(connection.remoteAddress + " disconnected");
            removeConnection(connection); 
        });
        
        // Handle incoming messages
        connection.on('message', function(message) {
            // console.log(message);
            if (message.type === 'utf8') {
                try {
                    var command = JSON.parse(message.utf8Data),
                        action = command['action'];
                    if (command && command['action']) {
                        var act = command['action'].split('\.');
                        var actionPath = process.cwd() + '/app/actions/' + act[0] +'\.js';
                        //console.log(actionPath);
                        var temp = require(actionPath);
                        
                        if(typeof temp[act[1]] === 'function'){
                            temp[act[1]](command['params'], connection);
                        }
                    }else{
                        connect.sendUTF(JSON.stringify(command));
                    }
                    
                }
                catch(e) {
                    // do nothing if there's an error.
                    console.log(e);
                }
            }
        });
    });
}

function removeConnection(conn){
    var ipKey =  conn.remoteAddress;
    wapp.count--;
    if (wapp.conns[ipKey]) {
        // remove the connection from the pool
        delete wapp.conns[ipKey];
    }
    conn.disconnected();
}