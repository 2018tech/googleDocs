
/*
 * @file handles routes for opening/saving/editing documents
 */
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

// Create new document
app.post('/create', function(req, res) {
  new Document({
    documentName: req.body.documentName, //in the form's input, need to put its name as documentName
    owner: req.user,
    content: '',
    collaborators: []
  }).save(function(err, doc) {
    if (err) {
      console.log(err);
      res.status(500).json({err: err.message});
      return;
    }
    res.status(200).json({success: true});
  })
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
  Document.findById(req.params.id, (err, doc) => {
    if (err) res.status(500).end(err.message)
    else res.json(doc)
  });
});

// saving and editing the document's content
app.post('/save', function(req, res){
Document.update({ _id: id }, { $set: { content: 'updated' }}, (err, result) => {
  if (err) res.status(500).end(err.message)
  else res.json(result)
});


app.listen(process.env.PORT || 3000)
module.exports = app;
