const LCdata = require('../data/lcstate.js');
//const tcpClient = require('./net/clsTcpClient');
const tcpClient = require('./clsTcpClient.js');

function packet()
{
    console.log("packethandler");
    console.log("packethandler");
    console.log("packethandler");

    console.log(LCdata.Lc_state);    
    console.log(tcpClient.connectionStatus);

    tcpClient.Client.SendData("gggg");
}

// function test()
// {
//     if(tcpClient.connectionStatus)
//         tcpClient.Client.SendData("gggg");

//     // if(net_client.connectionStatus.connected)    
//     //     net_client.Client.SendData("aaaa");
// }

// setInterval(test, 1000);     // connection manage

class packetHandler{
    constructor()
    {
        this.seq = 0;   // packet seq
    }

    rxHandler = (data) => {

    }

    msgHandler = (data) => {
        //opcode별로 처리

    }   

    sendResponse = () =>{

    }

    processLcState = (data) => {
        // lcstate set!

        //Lc_state.conflictSt = 1;
    }
}

module.exports = {
    packet: packet
}