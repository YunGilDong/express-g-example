var fs = require('fs');

const DEF_DUMP_LEN = 20;

function pad(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

class ClsLog{
    constructor(dir="./"){
        this.dir=dir;
        this.stamp="";
    }

    logging=(data)=>{
        // open
        var filePath = this.dir + "/" + this.genYMDstring();
        fs.open(filePath, 'a', function(err, fd){
            if(err){
                console.log('file open fail.. => ', err);
                return;
            } 

            fs.write(fd, data, 0, data.length,function(err, written, data){
                if(err) console.log('file write fail.. => ', err);
                
                fs.close(fd, function(){                    
                });
            })            
        });        
    }

    write=(data)=>{
        let message = "";
        message += this.genTimeString();
        message += "  " + data;
        this.logging(message+"\n");
    }

    dump=(stamp="MESSAGE", data)=>{
        // data : array
        let message="";        
        // time + stamp + \n
        message += this.genTimeString() + "  " + stamp+"\n";

        
        for(let idx=0; idx < data.length; idx++){
            if((idx % DEF_DUMP_LEN) == 0){
                if(idx!=0){
                    message = message+"\n";
                }
                message += "    ";
            }
            
            // 16진수 2자리로 표현
            message += pad(parseInt(data[idx],16), 2).toString() + " ";
        }
        message = message+"\n";
        this.stamp = this.genTimeString();
        this.logging(message);
    }

    genTimeString=()=>{
        let now = new Date();
        let year = now.getFullYear().toString();
        let mon = now.getMonth().toString();
        let day = now.getDate().toString();
        let sec = now.getSeconds().toString();
        let millSec = now.getMilliseconds().toString();

        

        let timeString = year +"-"+ mon +"-"+ day+"  "+sec+"."+millSec;
        return (timeString);
    }

    genYMDstring=()=>{
        let now = new Date();
        let year = now.getFullYear().toString();
        let mon = now.getMonth().toString();
        let day = now.getDate().toString();

        let timeString = year + mon + day;        
        return (timeString);
    }
}

exports.ClsLog = ClsLog;