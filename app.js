/*!
 * pushing together
 * GNU 3.0 Licensed
 */

'use strict';

var router = require('./config/routes.js')
var express = require('express')
var app = express()
var base = "/api/v1"
router(app, base)
app.listen(process.env.PORT, function () {
  console.log('Pushing Together listening on port '+process.env.PORT+'!')
})

