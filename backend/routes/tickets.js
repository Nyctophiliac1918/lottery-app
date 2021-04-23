var express = require('express');
var router = express.Router();
var {Ticket} = require('../models/Ticket')
var {User} = require('../models/User')

router.get('/', function(req, res, next) {
    res.send({name: "karan"});
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
            }
            else{
                if(foundUser.length){
                    foundUser[0].tickets.push(p);
                    foundUser[0].save((err) => {
                        return res.send(foundUser[0]);
                    });
                }
            }
        });
    
    }

    catch (err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
    
})

module.exports = router;