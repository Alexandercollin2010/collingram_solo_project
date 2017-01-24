var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

passport.use('local', new LocalStrategy({
  passReqToCallback: true
}, function(req, username, attemptedPass, done) {
    console.log('hit local strategy');
  // look up the user
  User.findOne({username: username}, function(err, user) {
    if(!user){
      done(null, false, {message: 'Incorrect credentials.'});

    }else{
      user.comparePassword(attemptedPass, function(err, isMatch) {
        if(isMatch){
          // this needs the user object
          done(null, user, {message: 'Login success!'});
        }else{
          done(null, false, {message: 'Incorrect credentials.'});
        }
      });
    }
  });
}));

// serialize user - "dehydrate"
passport.serializeUser(function(user, done) {
  console.log('serializeUser');
  done(null, user.id);
});

// deserialize user - "rehydrate"
passport.deserializeUser(function(id, done) {
  console.log('deserializeUser');
    User.findById(id, function(err, user) {
      done(null, user);
    });
  });

module.exports = passport;
