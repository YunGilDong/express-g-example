
//------------------------------------------------------------------------------
//
// Project:	Global
//
// Program:	-
// File:	Commbase.js
// Version:	
//
// History:
// Date		Who	Rev		Comment
// -------- --- ------- ----------------------------------------------------
//
//------------------------------------------------------------------------------
// constant
//------------------------------------------------------------------------------
const ENDIAN = {
    ED_BIG: 1,
    ED_LITTLE: 2,

}
//------------------------------------------------------------------------------
// function 
//------------------------------------------------------------------------------
// getNumber
//------------------------------------------------------------------------------
function getNumber(src, pos, length, endian = ENDIAN.ED_BIG){
    let value = 0;
    switch(endian)
    {
    case ENDIAN.ED_BIG:
        for(let idx = 0; idx < length; idx++){
            value = (value * 256) + (src[pos+idx]);
        }    
        break;
    case ENDIAN.ED_LITTLE:
        for(let idx = length-1; idx >= 0; idx--){
            value = (value * 265) + (src[pos+idx]);
        }
        break;
    }

    return value;
}
//------------------------------------------------------------------------------
// setNumber
//------------------------------------------------------------------------------
function setNumber(src, pos, value, length, endian = ED_BIG){
    switch(endian)
    {
    case ENDIAN.ED_BIG:
        for(let idx = length-1; idx >= 0; idx--, value /= 256){
            src[pos+idx] = value % 256;
        }
        break;
    case ENDIAN.ED_LITTLE:
        for(let idx = 0; idx < length; idx++, value /= 256){
            src[pos+idx] = value % 256;
        }
        break;
    }

    return (value);
}

module.exports = {
    getNumber: getNumber,
    setNumber: setNumber,
    ENDIAN: ENDIAN,
}
