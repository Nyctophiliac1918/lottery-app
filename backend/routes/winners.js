var express = require('express');
var router = express.Router();
var {Event} = require('../models/Event')
var {User} = require('../models/User')
var {Winner} = require('../models/Winners')
var moment = require('moment');

async function generateWinner( req, res) {

    console.log(moment().format('LT'));
    Event.find({resultAnnounced: false, date: {$lte: moment().format('L')}, time: {$lte: moment().format('LT')}}, function(err,result) {

        let arr=[];
        if(result.length) {result.forEach((event)=> { 
            
            let { users } = event;
            let len = users.length;
            let rn = Math.floor((Math.random()*len));
            
            if(users.length){
                User.find({'mobile': users[rn] }, function(err, foundUser){
                    if(err){
                        console.log(err);
                    }
                    else{
                        let eventWinner = new Winner({
                            user: users[rn],
                            event: event
                        })
            
                        arr.push(eventWinner);
                        eventWinner.save();
                        event.resultAnnounced = true;
                        event.save();
                        
                    }
                }); 
            }
        })}
        if(arr.length)
            return res.send(arr);
        else return res.send("No events")
    })
}

async function getWinner( req, res){

    Winner.find({}, function(err, result) {
        return res.send(result);
    })
}

router.get('/', generateWinner);
router.get('/list', getWinner);
module.exports = router;