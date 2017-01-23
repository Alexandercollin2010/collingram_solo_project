var express = require('express');
var path = require('path');
var passport = require('passport');
var router = express.Router();
var authenticate = require('../utilities/auth');
var Upload = require('../models/photos');

router.get('/', authenticate, function(req, res) {
  var indexPath = path.join(__dirname, '../public/views/imageUser.html');
  res.sendFile(indexPath);
});

router.get('/photos', function (req, res, next) {
  Upload.find({username: req.user.username},  function (err, uploads) {
    if (err) next(err);
    else {
      res.send(uploads);
    }
  });
});

router.delete('/:id', function(req, res){
  Upload.findByIdAndRemove(req.params.id).then(function(err){
    console.log('Err: ', err);
  });
  res.send(200);
}); // end delete


module.exports = router;
