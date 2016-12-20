var net = require('net');
var server = net.createServer(function (socket) {
  socket.on('data', function (data) {
    socket.write('你好');
  });

  socket.on('end', function () {
    console.log('连接断开');
  });

});

server.listen(8124, function () {
  console.log('server bound');
});
