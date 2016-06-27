// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();

var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to database

require('./config/passport')(passport); // js for config Passport

// Middle-ware Lib. ===============================================================
// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
	secret: process.env.SEESION_SECRET || 'oatlikeme',
	resave : false,
	saveUnintitialized : false,
	})); // session secret

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes configured passport

// launch ======================================================================
app.listen(port);
console.log('good@ localhost:' + port);
