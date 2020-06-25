var net = require('net');

let connectionStatus = {
    connected: false,
    connecting: false,    
}

function manageConnection()
{
    if(!connectionStatus.connected && !connectionStatus.connecting){
        console.log(`manageConnection ${connectionStatus.connected} ${connectionStatus.connecting}`);
        console.log(' call getConnection ');
        getConnection("node-express-svr");
                        
        connectionStatus.connecting = true; // connecting...
    }
}

function getConnection(connName){
    var client = net.connect({port: 6000, host: '127.0.0.1' },
    function(){       
        connectionStatus.connecting = false;
        connectionStatus.connected = true;

        console.log(`local : ${this.localAddress}, ${this.localPort}`);
        console.log(`remote : ${this.remoteAddress}, ${this.remotePort}`);

        client.setTimeout(2000);     // 2 sec
        client.setEncoding('utf8');

        console.log("client settint encoding: binary, timout: 500ms");

        client.on('connect', function(){
            connectionStatus.connecting = false;
            connectionStatus.connected = true;
            console.log("event connected.! :)");
        });

        // Received event
        this.on('data', function(data){
            console.log("received data len : " + data.length);            
            console.log("received data(1) : " + data);            
            console.log("received data(2) : " + data.toString());     
            // data check
            
            // write?

            writeData(this, "hello~~");
        });

        // Connection end event (send fin packet)
        client.on('end', function(){            
            console.log(connName + "connect end.!, bye :)");
        });

        // Error event
        client.on('error', function(err){
            console.log('error : ', JSON.stringify(err));
            client.end();
        });

        // timeout event
        client.on('timeout', function(){
            console.log('socket timeout!');    
            client.end();        
        });

        // socket close event
        client.on('close', function(){
            connectionStatus.connected = false;
            console.log('socket close');

            getConnection();
        });       

        client.on('drain', function(){
            console.log('client socket drain:');
        })

        client.on('lookup', function(){
            console.log('client socket lookup');
        })
    });

    return client;
}

function writeData(socket, data){
    var result = socket.write(data);
    console.log('write : ' + data);
    console.log('result : ' + result);
}

//var client = getConnection();
//writeData(client, "hello~~");

setInterval(manageConnection, 1000);     // connection manage