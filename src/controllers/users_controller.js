/*!
 * pushing together
 * GNU 3.0 Licensed
 */

'use strict';

var models = require('./application_controller');

module.exports = function() {

  var create = function(req,res){
    setImmediate(function () {
      var jsonStr = '{"action":"create user", "id": "1", "name": "Maurilio Atila"}';
      try {
        var jsonObj = JSON.parse(jsonStr);
        res.send(jsonObj);
      } catch (e) {
        res.status(400).send('Invalid JSON string');
      }
    });
  }
  
  var show = function(req,res){
    setImmediate(function () {
      models.User.findById(req.params.id)
      .then(function (user) {
          if(user) {
              res.status(200).send(user);
          }else {
            res.status(404).send('User not found');
          }
        })

      .error(function(err){
        res.status(500).send('Internal server error');
      });
    });
  }

  var update = function(req,res){ 
    setImmediate(function () {
      models.User.findById(req.params.id)
      .then(function (user) {
          if(user) {
            user.updateAttributes(req.body)
            .then(function (u) {
              res.status(200).send(user);
            })

            .error(function () {
              res.status(400).send('Error updating the user');
            });
          }else {
            res.status(404).send('User not found');
          }
        })

      .error(function(err){
        res.status(500).send('Internal server error');
      });
    });
  }
  
  var destroy = function(req,res){
    setImmediate(function () {
      models.User.findById(req.params.id)
      .then(function (user) {
        if(user) {
          user.destroy()
          .then(function (u) {
            res.status(200).send(user);
          })

          .error(function () {
            res.status(400).send('Error destroying the user');
          });
        }else {
          res.status(404).send('User not found');
        }
      })

      .error(function(err){
        res.status(500).send('Internal server error');
      });
    });
  }

  var getAll = function(req,res){
    setImmediate(function () {
      models.User.all()
      .then(function (users) {
        res.status(200).send(users);
      })

      .error(function(err){
        res.status(500).send('Internal server error');
      });
    });
  }

  return {
    create: function(req,res){
      return create(req,res);
    },
    show: function(req,res){
      return show(req,res);
    },
    update: function(req,res){
      return update(req,res);
    },
    destroy: function(req,res){
      return destroy(req,res);
    },
    getAll: function(req,res){
      return getAll(req,res);
    }
  }
}
