const express = require('express');
var {User} = require('../models/User')
var router = express.Router();

async function addUser(req, res){

  try{
    User.find({
      'mobile': req.body.mobile
    }, function(err, result) {
        //console.log(result);
        if (err) throw err;
        if (result.length!=0) {
          console.log("Yes");
          return res.send(result)
        } else {
          let id;
          let { name, email, mobile } = req.body;
          const user = new User({name, email, mobile});
          user.save((err)=>{
            id=user._id;
            User.findById(id, function(err, foundUser){
              //console.log(id);
              console.log(foundUser);
              if(err){
                console.log(err);
              }
              else{
                return res.send(foundUser);
              }
            })
          });
        }
      })
    }

  catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
}

router.get('/', function(req, res, next) {
  res.send({name: "karan"});
});

router.post('/', addUser);

module.exports = router;