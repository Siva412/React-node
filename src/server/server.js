var express = require('express');
var fs = require('fs');
var path = require("path");
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors({options:"http://localhost:3100/"}));
var urlRouter = express.Router();
urlRouter.post('/login',function(req,res,next){
    fs.readFile('../data/data.json',function(err,data){
        if(data){
            var loginData = JSON.parse(data).responseData.loginData,matchedData=[];
            var userName = req.body.userName;
            var pwd = req.body.pwd;
            matchedData = loginData.filter(function(a,i){
                return ((userName == a.userName) && (a.pwd == 'NA' || pwd == a.pwd));
            });
            if(matchedData.length == 1){
                res.json({"status":"S"});
            }
            else{
                res.json({"status":"F"});
            }
        }
        else{
            res.json({"status":"F"});
        }
    });
});
urlRouter.post('/signup',function(req,res,next){
    fs.readFile('../data/data.json',function(err,data){
        if(data){
            var dbData = JSON.parse(data), matchedData=[];
            var loginData = JSON.parse(data).responseData.loginData;
            var postData = req.body;
            var dbObj = {
                "id": loginData.length+1,
                "userName": postData.userName,
                "pwd": postData.pwd
            };
            matchedData = loginData.filter(function(a,i){
                return ((a.userName == postData.userName) && postData.pwd != "NA");
            });
            if(matchedData.length>0){
                res.json({"status":"AE"});
                return;
            }
            loginData.push(dbObj);
            dbData.responseData.loginData = loginData;
            fs.writeFile('../data/data.json',JSON.stringify(dbData,null,2),function(err){
                if(err){
                    res.json({"status":"F"});
                    throw err;
                }
                res.json({"status":"S"});
            });
        }
        else{
            res.json({"status":"F"});
        }
    });
});
urlRouter.post('/historyData',function(req,res,next){
    fs.readFile('../data/data.json',function(err,data){
        if(data){
            var histData = JSON.parse(data).responseData.historyData,matchedData=[];
            matchedData = histData.filter(function(a,i){
                return req.body.userName == a.userName;
            });
            if(matchedData.length > 0){
                res.json({"data":matchedData[0].data});
            }
            else{
                res.json({status:"F"});
            }
        }
        else{
            res.json({status:"F"});
        }
    });
});
urlRouter.post('/booking',function(req,res,next){
    fs.readFile('../data/data.json',function(err,data){
        if(data){
            var dbData = JSON.parse(data);
            var histData = JSON.parse(data).responseData.historyData,matchedData=[],newUser = true;
            matchedData = histData.map(function(a,i){
                if(req.body.userName == a.userName){
                    newUser = false;
                    a.data.push(req.body.histObj);
                }
                return a;
            });
            if(newUser){
                var newObj={
                    id:'',
                    userName:req.body.userName,
                    data:[req.body.histObj]
                };
                matchedData.push(newObj);
            }
            if(req.body.histObj.seatList){
                var busList = JSON.parse(data).responseData.busData.busList,modBusList=[];
                modBusList = busList.map(function(a,i){
                    if(req.body.histObj.seviceNo == a.svNo){
                        var modSeats = a.seatList.map(function(b,j){
                            for(var k=0;k<req.body.histObj.seatList.length;k++){
                                if(req.body.histObj.seatList[k] == b.id){
                                    b.ctgry = "blk";
                                }
                            }
                            return b;
                        });
                        a.seatList = modSeats;
                        return a;
                    }
                    else{
                        return a;
                    }
                });
                dbData.responseData.busData.busList = modBusList;
            }
            dbData.responseData.historyData = matchedData;
            readFile(dbData);
        }
    });
    function readFile(obj){
        fs.writeFile('../data/data.json',JSON.stringify(obj,null,2),function(err){
            if(err){
                res.json({"status":"F"});
                throw err;
            }
            res.json({"status":"S"});
        });
    }
});
urlRouter.get('/busList',function(req,res){
    fs.readFile('../data/data.json',function(err,data){
        if(data){
            var busList = JSON.parse(data).responseData.busData;
            if(busList){
                res.json(busList);
            }
            else{
                res.json({"status":"F"});
            }
        }
        else{
            res.json({"status":"F"});
        }
    });
});
app.use('/api',urlRouter);
app.listen('3002',function(){
    console.log("server started on 3002");
});