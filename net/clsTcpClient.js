var net = require('net');
const pcaketHandle = require('./packetHandler.js');

let connectionStatus = {
    connected: false,
    connecting: false,    
}

class TcpClient{    
    constructor(name, port, ipAddr){

        this.name = name;
        this.port = port;
        this.ipAddr = ipAddr;
        this.socket = null;
        
        this.manageConnection = this.manageConnection.bind(this);
        this.getConnection = this.getConnection.bind(this);
        this.SendData = this.SendData.bind(this);
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
            //console.log("received data len : " + data.length);            
            console.log("received data(1) : " + data.stringify);            
            console.log("received data type : " + typeof data);            
            //console.log("received data(2) : " + data.toString());     
            // data check

            let arrData=[];
            for(let i=0; i<data.length; i++)
            {
                let dataInfo = parseInt(data[i],10);
                arrData.push(dataInfo);                
            }
            console.log(arrData);
            pcaketHandle.rxHandler(arrData);
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
            //client.setEncoding('utf8');   => 수신데이터 string으로 변경
            //client.setEncoding('hex');
            //client.setEncoding('binary'); => 수신데이터 string으로 변경
            //client.setEncoding('ascii');
            
            this.connectionListener(client);        // listener OK

            // 최초에 write를 안하면 timeout 오류가 발생... (Why???)
            client.write("hello!!");
            this.socket = client;

        }catch(error)
        {
            console.log('exception:>');
            console.log(error);
        }      
    }  
    
    SendData(data){
        console.log(" Call SendData ");
        if(connectionStatus.connected)
            this.socket.write(data);
    }
}

let Client = new TcpClient("node-client",6000, "127.0.0.1");

setInterval(Client.manageConnection, 1000);     // connection manage




exports.connectionStatus = connectionStatus;
exports.Client = Client;

//pcaketHandle.packet();

// module.exports = {
//     connectionStatus: connectionStatus,
//     Client: Client,
// }