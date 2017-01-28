var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var Upload = require('../models/photos');
var multer = require('multer');
var user = require('../utilities/auth');

var upload = multer({dest: 'uploads/'});


router.get('/', user, function(req, res) {
  var homePath = path.join(__dirname, '../public/views/imageAdd.html');
  res.sendFile(homePath);

});

/**
* Gets the list of all files from the database
*/
router.get('/photos', function (req, res, next) {
  Upload.find({},  function (err, uploads) {
    if (err) next(err);
    else {
      res.send(uploads);
    }
  });
});

/**
* Gets a file from the hard drive based on the unique ID and the filename
*/
router.get('/:uuid/:filename', function (req, res, next) {
  console.log('dammit ',req.params);
  Upload.findOne({
    'file.filename': req.params.uuid,
    'file.originalname': req.params.filename
  }, function (err, upload) {

    if (err) next(err);
    else {
      res.set({
        "Content-Disposition": 'attachment; filename="' + upload.file.originalname + '"',
        "Content-Type": upload.file.mimetype
      });
      fs.createReadStream(upload.file.path).pipe(res);
    }
  });
});

/**
* Create's the file in the database
*/
router.post('/', upload.single('file'), function (req, res, next) {
  console.log(req.body);
  console.log(req.file);
  var newUpload = {
    name: req.body.name,
    created: Date.now(),
    file: req.file,
    username: req.user.username
  };
  Upload.create(newUpload, function (err, next) {
    if (err) {
      res.sendStatus(404);
    } else {
      res.send(newUpload);
    }
  });
});

module.exports = router;
