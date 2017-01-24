
var mongoose = require('mongoose');

var UploadSchema = mongoose.Schema({
  name: {type: String, required: true, unique: true},
  created: Date,
  file: Object,
  username: String
});

module.exports = mongoose.model('Upload', UploadSchema);
