var express = require('express');
var path = require('path');
var passport = require('passport');
var router = express.Router();
var authenticate = require('../utilities/auth');
var User = require('../models/user');

router.get('/', authenticate, function(req, res) {

  var regPath = path.join(__dirname, '../public/views/updateUser.html');
  res.sendFile(regPath);
});

router.post('/updateUser',  function (req, res, next) {
  console.log('In update post');
  var updateUser = {
    email: req.body.email,
    streetAdress: req.body.streetAdress,
    city: req.body.city,
    state: req.body.state
  };
  User.update({username: req.user.username},{ $set: {email:req.body.email}}, function (err, next) {
    if (err) {
      next(err);
    } else {
      User.update({username: req.user.username},{ $set: {streetAdress: req.body.streetAdress}}, function (err, next) {
        if (err) {
          next(err);
        } else {
          User.update({username: req.user.username},{ $set: {city: req.body.city}}, function (err, next) {
            if (err) {
              next(err);
            } else {
              User.update({username: req.user.username},{ $set: {state: req.body.state}}, function (err, next) {
                if (err) {
                  next(err);
                } else {
                  res.send(200);
                }
              });
            }
          });
        }
      });
    }
  });
});

module.exports = router;
