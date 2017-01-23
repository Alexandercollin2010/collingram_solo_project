var express = require('express');
var router = express.Router();
var path = require('path');

var UserSchema = require('../models/user');

router.get('/', function(req, res) {

  var regPath = path.join(__dirname, '../public/views/register.html');
  res.sendFile(regPath);
});

router.post('/', function(req, res) {
  var sentUser = req.body;

  UserSchema.create(sentUser, function(err, response, next) {
    if(err){
      next(err);
    }else{
      res.status(201).send({message: "new user created successfully"});
    }
  });
});

router.get('/userInfo', function(req,res){
  console.log('In userInfo');
  UserSchema.find({})
  .then(function (data){
    res.send(data);
  });

});

module.exports = router;
