var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var SALT_WORK_FACTOR = 10;

// adding anyone who registers to the database
var UserSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email: String,
  streetAdress: String,
  city: String,
  state: String
});

// creating a crypted password for the user
UserSchema.pre('save', function(next) {
  var user = this;

  if(!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {

        // change the password to the hash
        user.password = hash;
        next();
      });
  });
});

// compare passwords
UserSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err ? callback(err) : callback(null, isMatch)); // null - no error, and matched true/false
  });
};



var User = mongoose.model('users', UserSchema);
module.exports = User;
