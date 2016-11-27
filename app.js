/*!
 * pushing together
 * GNU 3.0 Licensed
 */

'use strict';

var express = require('express');
var expressRouter = express.Router();
var appRouter = require('./config/routes.js');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var morgan = require('morgan');

var app = express();
var base = "/api/v1";

require('./config/passport')(passport);


app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: 'ilovemadrid' }));
app.use(passport.initialize());
app.use(passport.session());


//use express Router and set our app routes
app.use(expressRouter);
appRouter(expressRouter, base, passport);

app.listen(process.env.PT_PORT, () => {
  console.log('Pushing Together listening on port '+process.env.PT_PORT+'!');
});

