/**
 * @file handles routes for opening/saving/editing documents, and passport authentication.
 * @author Raj Kane
 * @author Jon Lee
 * @author Henry Gaskin
 * @author Anshul Nanda
 */
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
var auth = require("./routes/auth");
var api = require("./routes/api");

var User = require('./models/models').User;
var Document = require('./models/models').Document;

// var routes = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());


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
  console.log('hi');
    User.findOne({ username: username }, function (err, user) {
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


app.use(auth(passport))
app.use(api)



// app.use('/', routes(passport));
// app.use('/', auth(passport));

// catch 404 and forward to error handler


// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

// Create new document
app.post('/create', function(req, res) {
  new Document({
    documentName: req.body.documentName, //in the form's input, need to put its name as documentName
    owner: req.user,
    content: '',
    collaborators: [req.user],
    password: req.body.password
  }).save(function(err, doc) {
    if (err) {
      console.log(err);
      res.status(500).json({err: err.message});
      return;
    }
    res.status(200).json({success: true, doc: doc});
  })
})

// GET request to Documents List
app.get('/documents', function(req, res) {
  Document.find({collaborators: {$in: [req.user]}}, (err, documents) => {
    if (err) res.status(500).end(err.message)
    else res.json(documents)
  });
});


// GET request for individual document from documents list (by doc:id)
app.get('/document/:id', function(req, res) {
  Document.findById(req.params.id, (err, doc) => {
    if (err) res.status(500).end(err.message)
    else res.json(doc)
  });
});

// saving and editing the document's content
app.post('/save', function(req, res){
Document.update({ _id: req.body.id }, { $set: { content: req.body.newContent }}, (err, result) => {
  if (err) {
    res.json({success: false});
  } else res.json({success: true})
})
});


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.listen(process.env.PORT || 3000)
module.exports = app;
