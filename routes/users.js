var express = require('express');
var path = require('path');
var passport = require('passport');
var router = express.Router();
var authenticate = require('../utilities/auth');


router.get('/', authenticate, function(req, res) {
  var indexPath = path.join(__dirname, '../public/views/users.html');
  res.sendFile(indexPath);
});

module.exports = router;
