var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');
var passport = require('./strategies/userStrategy');

//require routers
var indexRouter = require('./routes/index');
var registerRouter = require('./routes/register');
var homeRouter = require('./routes/imageAdd');
var allImages = require('./routes/imageAll');
var userImages = require('./routes/imageUser');
var users = require('./routes/users');
var updateUser = require('./routes/updateUser');

var app = express();
// conect to mongodb
var mongoURI = "mongodb://heroku_l323p20s:ct8shctmji30mbkc7j5heqko62@ds137139.mlab.com:37139/heroku_l323p20s";
mongoose.connect(mongoURI);

// middleware
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(session({
   secret: 'secret',
   key: 'user',
   resave: 'true',
   saveUninitialized: false,
   cookie: { maxage: 60000, secure: false }
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routers
app.use(logger('dev'));
app.use('/index', indexRouter);
app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/uploads', homeRouter);
app.use('/allImages', allImages);
app.use('/userImages', userImages);
app.use('/users', users);
app.use('/update', updateUser);

// server port set and listen
var serverPort = process.env.port || 3004;
app.set('port', serverPort);

var server = app.listen(serverPort, function() {
  console.log('up and listening on', server.address().port);
});
