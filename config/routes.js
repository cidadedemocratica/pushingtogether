/*!
 * pushing together
 * GNU 3.0 Licensed
 */

'use strict';

var User = require('../src/controllers/users_controller.js')
var Event = require('../src/controllers/events_controller.js')

module.exports=function(app, base) {
  
  //user
 
  //create
  app.post(base+'/user', function (req, res) {
    User.create(req,res)
  })
  //show
  app.get(base+'/user/:id', function (req, res) {
    User.show(req,res)
  })
  //update
  app.put(base+'/user/:id', function (req, res) {
    User.update(req,res)
  })
  //destroy
  app.delete(base+'/user/:id', function (req, res) {
    User.destroy(req,res)
  })
  //show all
  app.get(base+'/users', function (req, res) {
    User.getAll(req,res)
  })

  //event
 
  //create
  app.post(base+'/event', function (req, res) {
    Event.create(req,res)
  })
  //show
  app.get(base+'/event/:id', function (req, res) {
    Event.show(req,res)
  })
  //update
  app.put(base+'/event/:id', function (req, res) {
    Event.update(req,res)
  })
  //destroy
  app.delete(base+'/event/:id', function (req, res) {
    Event.destroy(req,res)
  })
  //show all
  app.get(base+'/events', function (req, res) {
    Event.getAll(req,res)
  })

  
}
