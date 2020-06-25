//현황
let Main_state = {
	lcCount: 0,
	scuFixCyc:	0,
	localAct: 0,
	localNonAct: 0,
	centerAct: 0,
	centerNonAct: 0,
	keepPhase: 0,
	commError: 0,
	lightOff: 0,
	flash: 0,
	manual: 0,
	conflict: 0,
	doorOpen: 0,
	conflictImpassible: 0,
};

//제어기 상태
let Lc_state = {
	oprMode: 0,         // 운영모드
	conflictSt: 0,      // 모순상태
	lightOffSt: 0,      // 소등상태
	flashSt: 0,         // 점멸상태
	doorSt: 0           // 도어 열림 상태
};

//module.exports = Lc_state;

let connectionStatus = {
    connected: false,
    connecting: false,    
}


module.exports = {
    Lc_state: Lc_state,
    connectionStatus: connectionStatus
}