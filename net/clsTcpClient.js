var net = require('net');

let connectionStatus = {
    connected: false,
    connecting: false,    
}

connectionListener2=(client)=>{
    connectionStatus.connecting = false;
    connectionStatus.connected = true;

    console.log(this.name+' connected');            
    console.log(`local : ${client.localAddress}, ${client.localPort}`);
    console.log(`remote : ${client.remoteAddress}, ${client.remotePort}`);

    // client.setTimeout(2000);     // 2000ms
    // client.setEncoding('utf8');

    console.log("client setting encoding: binary, timeout: 2000ms");

    client.on('connect', function(){
        console.log("event connected.! :)");
    });

    // Received event
    client.on('data', function(data){
        console.log("received data len : " + data.length);            
        console.log("received data(1) : " + data);            
        console.log("received data(2) : " + data.toString());     
        // data check

        // echo
        client.write("hello~~");
        //writeData(client, "hello~~");
    });

    // Connection end event (send fin packet)
    client.on('end', function(){
        console.log(this.name + "connect end.!, bye :)");
    });

    // Error event
    client.on('error', function(err){
        console.log('error : ', JSON.stringify(err));
        connectionStatus.connected = false;
        connectionStatus.connecting = false;

        client.end()
    });            

    // timeout event
    client.on('timeout', function(){
        console.log('socket timeout!');            
        client.end();

        // if(connectionStatus.connected)
        // {
        //     client.end();
        // }
    });

    // socket close event
    client.on('close', function(){
        connectionStatus.connected = false;
        connectionStatus.connecting = false;
        console.log('socket close');
    });       

    client.on('drain', function(){
        console.log('client socket drain:');
    })

    client.on('lookup', function(){
        console.log('client socket lookup');
    })
}

class TcpClient{    
    constructor(name, port, ipAddr){

        this.name = name;
        this.port = port;
        this.ipAddr = ipAddr;
        
        this.manageConnection = this.manageConnection.bind(this);
        this.getConnection = this.getConnection.bind(this);
    }

    manageConnection(){        
        if(!connectionStatus.connected && !connectionStatus.connecting){
            console.log(`manageConnection ${connectionStatus.connected} ${connectionStatus.connecting}`);
            console.log('manageConnection => getConnection ');
            this.getConnection("node-express-svr");
            //this.getConnection2();
                            
            connectionStatus.connecting = true; // connecting...
        }
    }

    connectionListener=(client)=>{
        connectionStatus.connecting = false;
        connectionStatus.connected = true;

        console.log(this.name+' connected');            
        console.log(`local : ${client.localAddress}, ${client.localPort}`);
        console.log(`remote : ${client.remoteAddress}, ${client.remotePort}`);

        // client.setTimeout(2000);     // 2000ms
        // client.setEncoding('utf8');

        console.log("client setting encoding: binary, timeout: 2000ms");

        client.on('connect', function(){
            console.log("event connected.! :)");
        });

        // Received event
        client.on('data', function(data){
            console.log("received data len : " + data.length);            
            console.log("received data(1) : " + data);            
            console.log("received data(2) : " + data.toString());     
            // data check

            // echo
            client.write("hello~~");
        });

        // Connection end event (send fin packet)
        client.on('end', function(){
            console.log(this.name + "connect end.!, bye :)");
        });

        // Error event
        client.on('error', function(err){
            console.log('error : ', JSON.stringify(err));
            connectionStatus.connected = false;
            connectionStatus.connecting = false;

            //client.end()
        });            

        // timeout event
        client.on('timeout', function(){
            console.log('socket timeout!');            
            client.end();
        });

        // socket close event
        client.on('close', function(){
            connectionStatus.connected = false;
            connectionStatus.connecting = false;
            console.log('socket close');
        });       

        client.on('drain', function(){
            console.log('client socket drain:');
        })

        client.on('lookup', function(){
            console.log('client socket lookup');
        })
    }

    getConnection(connName){
        console.log('connecting.....');
        try{
            //var client = await net.connect({port: 6000, host: "127.0.0.1" });
            var client = net.connect(6000, "127.0.0.1");  //
            console.log('connected!');
            client.setTimeout(2000);     // 2000ms
            client.setEncoding('utf8');
            this.connectionListener(client);        // listener OK
            //connectionListener2(client);          // listener OK

            // 최초에 write를 안하면 timeout 오류가 발생... (Why???)
            client.write("hello!!");

        }catch(error)
        {
            console.log('exception:>');
            console.log(error);
        }      
    }    
}

let Client = new TcpClient("node-client",6000, "127.0.0.1");
setInterval(Client.manageConnection, 1000);     // connection manage
