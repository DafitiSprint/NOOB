var app = require('express')()
var server = require('http').createServer(app);
var WebSocketServer = require('ws').Server;

server.listen(8083);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/alert', function(req, res) {
    ws.broadcast('APITA!');
    res.send('Alert Sent!');
});

var ws = new WebSocketServer({server: server});
ws.on('connection', function(ws) {
    ws.on('message', function(message) {
        console.log('received: %s', message);
    });
    ws.send('WELCOMEEE!!! =]');
});

ws.broadcast = function(data) {
    for(var i in this.clients)
        this.clients[i].send(data);
};
