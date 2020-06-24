var net = require('net');

var client = new net.Socket();
client.connect(6000, '127.0.0.1', function() {
	console.log('Connected');
	client.write('Hello, server! Love, Client.');
});

client.on('data', function(data) {
	console.log('Received: ' + data);
	//client.destroy(); // kill client after server's response
});

// socket.on("error", function() {
//     console.log("Caught flash policy server socket error: ")
//     console.log(err.stack);
// });

client.on('error', function() {
	console.log('error');
});

client.on('end', function() {
    console.log('Requested an end to the TCP connection');
});

client.on('close', function() {
	console.log('Connection closed');
});