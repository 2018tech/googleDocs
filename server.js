var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
var auth = require("./routes/auth");
var api = require("./routes/api");

var User = require('./models/models').User;
// var routes = require('./routes/index');
var auth = require('./routes/auth');

var app = express();


// view engine setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(auth(passport))
app.use(api)



// app.use('/', routes(passport));
// app.use('/', auth(passport));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// POST register page
app.post('/register', function(req, res) {
  new User( {
    username: req.body.username,
    password: req.body.password,
    documentList: []
  }).save()
    .then()
    .catch()
})

// GET request to Documents List
app.get('/document', function(req, res) {
  Document.find({}, (err, doc) => {
    if (err) res.status(500).end(err.message)
    else res.json(doc)
  });
});


// GET request for individual document from documents list (by doc:id)
app.get('/document/:id', function(req, res) {
  Document.findById(req.params.id)

})

// POST request for saving a document
app.post('')

app.listen(process.env.PORT || 3000)
module.exports = app;
