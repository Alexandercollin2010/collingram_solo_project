var express = require('express');
var path = require('path');
var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res) {
  var indexPath = path.join(__dirname, '../public/views/index.html');
  res.sendFile(indexPath);
});

router.post('/', passport.authenticate('local'), function(req, res) {
    res.sendStatus(200);
});

router.get('/logout', function (req, res) {
  console.log('In log out!');
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/user', function (req,res) {
  var user = { username: req.user.username };
    res.send(user);

});

module.exports = router;
