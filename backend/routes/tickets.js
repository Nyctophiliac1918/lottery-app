var express = require('express');
var router = express.Router();
var {Ticket} = require('../models/Ticket')
var {User} = require('../models/User')

router.get('/', function(req, res, next) {
    Ticket.find({}, function(err, tickets)
    {
        if(err)
            console.log(err);
        else 
        {
            if(tickets.length)
                res.status(200).send(tickets);
            else res.status(404).send("No tickets found");
        }
    })
});

router.post('/', function(req,res)
{

    try{
        let id;
        let { mobile } = req.body;
        const p = new Ticket({mobile});
        p.save((err,res) => { id = p._id });

        User.find({'mobile': req.body.mobile }, function(err, foundUser){
            if(err){
                console.log(err);
                return res.sendStatus(200);
            }
            else{
                if(foundUser.length){
                    foundUser[0].tickets.push(p);
                    foundUser[0].save((err) => {
                        return res.send(foundUser[0]);
                    });
                }
                else return res.status(404).send("No user found associated with this number");
            }
        });
    
    }

    catch (err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
    
})

module.exports = router;