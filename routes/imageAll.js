var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var Upload = require('../models/photos');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});

router.get('/', function(req, res) {
  var indexPath = path.join(__dirname, '../public/views/imageAll.html');
  res.sendFile(indexPath);
});



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


module.exports = router;
