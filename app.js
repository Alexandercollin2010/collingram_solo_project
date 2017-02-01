var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');
var passport = require('./strategies/userStrategy');
var MongoStore = require('connect-mongo')(session);

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


var connectionString = process.env.MONGODB_URI;



mongoose.connect(connectionString);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connection open ', connectionString);
});

mongoose.connection.on('error', function (err) {
  console.log('Mongoose error connecting ', err);
});

// middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// app.use(session({
//    secret: 'secret',
//    key: 'user',
//    resave: 'true',
//    saveUninitialized: false,
//    cookie: { maxage: 60000, secure: false }
// }));

app.use(session({
    secret:'secret',
    maxAge: new Date(Date.now() + 3600000),
    store: new MongoStore({mongooseConnection:mongoose.connection})
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
// var serverPort = process.env.port || 3004;
// app.set('port', serverPort);
app.listen(process.env.PORT);

// var server = app.listen(serverPort, function() {
//   console.log('up and listening on', server.address().port);
// });
