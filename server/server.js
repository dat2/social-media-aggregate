var express = require('express');
var app = express();
var path = require('path');
var passport = require('passport');

var cookieParser = require('cookie-parser');
var session = require('express-session');

// mongoose (mongoDb stuff)
var mongoose = require('mongoose');
var configDB = require('./config/database.js');
mongoose.connect(configDB.url);
mongoose.Promise = require('bluebird');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// sessions
app.use(cookieParser());
app.use(session({
  secret: 'social-media-aggregate',
  resave: false,
  saveUninitialized: false
}));

// passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// routes
require('./app/routes')(app, passport);

// setup
app.use(express.static(path.resolve(__dirname, '../client/public')));
var PORT = 3000;
app.listen(PORT, function() {
  console.log('listening on port ' + PORT);
});
