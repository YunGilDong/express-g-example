//---------------------------------------------------------------------------
// require
//---------------------------------------------------------------------------
const LCdata = require('../data/lcstate.js');
const tcpClient = require('./clsTcpClient.js');
const GenLib = require('../Genlib/ClsLog');
const Comm = require('../Genlib/Commbase');
//---------------------------------------------------------------------------
// Protocol
//---------------------------------------------------------------------------
const LCST_STX_CHAR = 0x7E;     
const MIN_PACKET = 5;       // header size
//---------------------------------------------------------------------------
const LCPT_STX = 0;
const LCPT_SIZE1 = LCPT_STX+1;
const LCPT_SIZE2 = LCPT_SIZE1+1;
const LCPT_SEQ = LCPT_SIZE2+1;
const LCPT_OPCODE = LCPT_SEQ+1;
const LCPT_DATA = LCPT_OPCODE+1;
//---------------------------------------------------------------------------
const LCOPCD_STATE = 0x10;
//---------------------------------------------------------------------------
// Local
//---------------------------------------------------------------------------
let Log = new GenLib.ClsLog("./log");
// test
function packet()
{
    console.log("packethandler");
    console.log("packethandler");
    console.log("packethandler");

    console.log(LCdata.Lc_state);    
    console.log(tcpClient.connectionStatus);

    tcpClient.Client.SendData("gggg");
}
//---------------------------------------------------------------------------
// function
//---------------------------------------------------------------------------

function rxHandler(data){
    // rx data logging to file
    let seq = 0;
    Log.write("rxhandler" + data.length);
    Log.dump("RX",data);

    // message 유효성 검사 후  => msgHandler()
    // Check STX 
    if(data[LCPT_STX] != LCST_STX_CHAR)
    {
        Log.write("Invalid STX " + parseInt(data[LCPT_STX], 16));
    }

    // Check size 
    let dataSize = Comm.getNumber(data, LCPT_SIZE1, 2, Comm.ENDIAN.ED_BIG);
    if(dataSize + MIN_PACKET != data.length){
        Log.write("Invalid data lenght [" + dataSize+"], ["+data.length+"]");
    }
    
    let arrData = JSON.parse(JSON.stringify(data));

    msgHandler(arrData);
}

function msgHandler(data){
    //opcode별로 처리
    let code = data[LCPT_OPCODE];
    Log.dump("msgHandler",data);

    switch(code)
    {
    case LCOPCD_STATE:
        processLcState(data);
        break;
    default:
        Log.write("Invalid opcode : ["+parseInt(data[LCPT_OPCODE], 16)+"]");
    }
}   

function sendResponse(msg){

}

function processLcState(data){
    // lcstate set!

    console.log("processLcState"); 
    
    //let count = data[LCPT_DATA];
    let count = Comm.getNumber(data, LCPT_DATA, 2, Comm.ENDIAN.ED_BIG);
    //let count = data[6];
    const dataSize=28;  // LC 상태 데이터 사이즈
    LCdata.LcStates.count = count;     

    Log.write("processLcState");
    Log.dump("processLcState", data);

    console.log(`data count : ${count}`);
    for(let idx = 0; idx < count; idx++){
        let offsetIdx = dataSize * idx + LCPT_DATA + 2;     // 2 : lcID, group number

        LCdata.Lc_state.oprMode = data[offsetIdx + 0];

        console.log("oprmode : ", LCdata.Lc_state.oprMode);
        
        LCdata.Lc_state.conflictSt = (data[offsetIdx + 3] & 0x08 == 1)?1:0;
        LCdata.Lc_state.lightOffSt = (data[offsetIdx + 3] & 0x04 == 1)?1:0;
        LCdata.Lc_state.flashSt = (data[offsetIdx + 3] & 0x02 == 1)?1:0;

        LCdata.Lc_state.doorSt = (data[offsetIdx + 4] & 0x01 == 1)?1:0;

        LCdata.Lc_state.commSt = data[offsetIdx + 25];

        console.log(LCdata.Lc_state);

        
        
        LCdata.LcStates.state.push(LCdata.Lc_state);
    }

    console.log(LCdata.LcStates.state);
}
//---------------------------------------------------------------------------
// export
//---------------------------------------------------------------------------
module.exports = {
    packet: packet,
    rxHandler: rxHandler
}
//---------------------------------------------------------------------------
// end of packetHandler.js
//---------------------------------------------------------------------------