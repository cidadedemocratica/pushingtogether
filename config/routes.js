/*!
 * pushing together
 * GNU 3.0 Licensed
 */

'use strict';

module.exports=function(app, base) {
  
  //user
 
  //create
  app.post(base+'/user', function (req, res) {
    res.send('create user')
  })
  //show
  app.get(base+'/user/:id', function (req, res) {
    res.send('your id is ' + req.params.id)
  })
  //update
  app.put(base+'/user/:id', function (req, res) {
    res.send('update user ' + req.params.id)
  })
  //delete
  app.delete(base+'/user/:id', function (req, res) {
    res.send('delete user ' + req.params.id)
  })
  //show all
  app.get(base+'/users', function (req, res) {
    res.send('all users')
  })

  //event

  //create
  app.post(base+'/event', function (req, res) {
    res.send('create event')
  })
  //show
  app.get(base+'/event/:id', function (req, res) {
    res.send('your id is ' + req.params.id)
  })
  //update
  app.put(base+'/event/:id', function (req, res) {
    res.send('update event ' + req.params.id)
  })
  //delete
  app.delete(base+'/event/:id', function (req, res) {
    res.send('delete event ' + req.params.id)
  })
  //show all
  app.get(base+'/events', function (req, res) {
    res.send('all events')
  })

}
