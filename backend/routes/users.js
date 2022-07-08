const express = require('express');
var {User} = require('../models/User')
var router = express.Router();

async function addUser(req, res){

  try{
    await User.find({ 'mobile': req.body.mobile }, function(err, result) {
      if (err) throw err;
      if (result.length) {
        return res.send(result);
      } else {
        let id;
        let { name, email, mobile } = req.body;
        const user = new User({name, email, mobile});
        user.save((err)=>{
          id=user._id;
          User.findById(id, function(err, foundUser){
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
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
}

router.get('/users', function(req, res, next) {
  User.find({}, function(err, users)
    {
        if(err)
            console.log(err);
        if (users.length) {
          return res.status(200).send(users);
        }
        else return res.status(200).send("No users found");
    })
});

router.post('/', addUser);

module.exports = router;