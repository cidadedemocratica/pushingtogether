/*!
 * pushing together
 * GNU 3.0 Licensed
 */

'use strict';

var user = require('../src/controllers/user.js')()

module.exports=function(app, base) {
  
  //user
 
  //create
  app.post(base+'/user', function (req, res) {
    user.create(req,res)
  })
  //show
  app.get(base+'/user/:id', function (req, res) {
    user.show(req,res)
  })
  //update
  app.put(base+'/user/:id', function (req, res) {
    user.update(req,res)
  })
  //delete
  app.delete(base+'/user/:id', function (req, res) {
    user.delete(req,res)
  })
  //show all
  app.get(base+'/users', function (req, res) {
    user.getAll(req,res)
  })

  //event
 
  //create
  app.post(base+'/event', function (req, res) {
    event.create(req,res)
  })
  //show
  app.get(base+'/event/:id', function (req, res) {
    event.show(req,res)
  })
  //update
  app.put(base+'/event/:id', function (req, res) {
    event.update(req,res)
  })
  //delete
  app.delete(base+'/event/:id', function (req, res) {
    event.delete(req,res)
  })
  //show all
  app.get(base+'/events', function (req, res) {
    event.getAll(req,res)
  })

  
}
