var express = require('express');
var router = express.Router();
var {Event} = require('../models/Event')
var {Ticket} = require('../models/Ticket')
var {User} = require('../models/User')
var moment = require('moment');

// API endpoint for finding the next events going to take place
router.get('/', function(req, res, next) {
    Event.find({resultAnnounced: false, date: {$gt: moment().format('L')}}, null, {sort: {date: 1}}, function (err, users) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        else res.send(users);
    });
});

// API endpoint which allows user to participate in the game and checks that he/she can participate in only one event wth one ticket.
router.get('/participate', function(req, res, next) {
    let ans=req.query.id;
    let ticket = req.query.ticketid;
    let flag = false;

    Ticket.findById(ticket, function (err, user) {
        if (!err) {
            User.find({'mobile': user.mobile }, function(err, foundUser){

                if(err){
                    console.log(err);
                }
                else{
                    if(foundUser.length){
                        foundUser[0].event.forEach((e) => 
                        {
                            if(e === ans)
                            {
                                flag=true;
                                console.log(flag);
                            }
                        });
                        if(!flag)
                        {   
                            foundUser[0].event.push(ans);
                            foundUser[0].tickets.pull({_id:ticket});
                            foundUser[0].save();
                        }
                    }
                }
            });
            Event.findById(ans, function(err, foundUser){
                if(err){
                    console.log(err);
                }
                else{
                    if(foundUser){
                        
                        foundUser.users.forEach((e) => 
                        {
                            console.log(e);
                            if(e === user.mobile)
                            {
                                flag=true;
                                console.log(flag);
                            }
                        });
                        if(!flag)
                        {   
                            foundUser.users.push(user.mobile);
                            user.delete((err) => {console.log("Deleted Successfully");});
                            foundUser.save((err) => {
                                console.log("Hi");
                            });
                        }
                        if(!flag)
                            return res.send("Can participate");
                        else{
                            return res.status(404).send("Oh uh, something went wrong");
                        }
                    }
                }
            });
        }
    });

});

// Call for saving a new event
router.post('/', function(req,res)
{

    try
    {
        let { reward, date, time } = req.body;
        const event = new Event ({
            reward: reward,
            date: date,
            time: time,
            resultAnnounced: false
        });
        event.save();

        return res.sendStatus(200);
    }

    catch (err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
    
})

module.exports = router;
