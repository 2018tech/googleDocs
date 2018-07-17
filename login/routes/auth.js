var express = require('express');
var router = express.Router();
var models = require('../models/models');

module.exports = function(passport) {

  router.post('/register', function(req, res) {
    // validation step

    var u = new models.User({
      username: req.body.username,
      password: req.body.password,
      documentList: []
    });
    u.save(function(err, user) {
      if (err) {
        console.log(err);
        res.status(500).json({err: err.message});
        return;
      }
      console.log(user);
      res.status(200).json({success: true});
    });
  });

  // POST Login page
  router.post('/login', passport.authenticate('local'), function(req, res) {
    res.json({sucess: true});
  });

  // GET Logout page
  router.get('/logout', function(req, res) {
    req.logout();
    res.json({sucess: true});
  });

  return router;
};
