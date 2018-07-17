var express = require('express');
var router = express.Router();
var models = require('../models/models');
import LocalStrategy from 'passport-local'

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // passport strategy
  passport.use(new LocalStrategy(function(username, password, done) {
    // Find the user with the given username
    console.log(username, password)
      models.User.findOne({ username: username }, function (err, user) {
        // if there's an error, finish trying to authenticate (auth failed)
        if (err) {
          console.log(err);
          return done(err);
        }
        // if no user present, auth failed
        if (!user) {
          console.log(user);
          return done(null, false, { message: 'Incorrect username.' });
        }
        // if passwords do not match, auth failed
        if (user.password !== password) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        // auth has has succeeded
        return done(null, user);
      });
    }
  ));
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
  router.post('/login', function(req, res, next){
    passport.authenticate('local', function(err, user,info){
      console.log(err, user, info);
      res.json({sucess: true});
    })(req, res, next)

  })

  // GET request to Documents List


  // POST register page


  // GET request for individual document from documents list (by doc:id)





  // POST request for saving a document


  // GET Logout page
  router.get('/logout', function(req, res) {
    req.logout();
    res.json({sucess: true});
  });

  return router;
};
