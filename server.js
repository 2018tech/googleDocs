 //express is for routing
var express = require('express');
var path = require('path');
var logger = require('morgan');

//cookieparser is for cookieParser, also for sessions. bodyparser is for accecssing things in the INPUT field
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');


//getting passport stuff before accessing the database
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//right after we connect to mongoose, we connect to the database
//the next two lines represent just that
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

//require the authentication backend
var auth = require("./routes/auth");
//require socketio
import socketIO from 'socket.io';
import http from 'http';
import socketApi from './routes/socket';
//grab our mongoose models
var User = require('./models/models').User;
var Document = require('./models/models').Document;


var app = express();
const server = http.Server(app);
const io = socketIO(server);
socketApi(io);

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

//first thing we have on our backend is the passport setup.
//it uses localstrategy, then serialize user, then deserialize user
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

//after deserializing our user, we use auth.js file.
//usually after app.use comes function(), but in this case, that function is auth(passport)
//whenever we do module.exports=function(passport), that's filename(input)
//so in this case, it's auth(passport). auth is the file name and passport is the input
app.use(auth(passport))


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


//BACKEND ROUTES START HERE!!!!!
// Create new document
app.post('/create', function(req, res) {
  new Document({
    documentName: req.body.documentName, //in the form's input, need to put its name as documentName
    owner: req.user, //req.user is produced from the passport when it deserializes
    content: '', //content is empty when it starts
    collaborators: [req.user], //yourself is automatically inserted as a collaborator when you start a document
    password: req.body.password //in the form's input, need to put its name as password
  }).save(function(err, doc) {
    if (err) {
      console.log(err);
      res.status(500).json({err: err.message});
      return;
    }
    res.status(200).json({success: true, doc: doc});
  })
})

// this is going to GET all the document where the user is a collaborator
app.get('/documents', function(req, res) {
  Document.find({collaborators: {$in: [req.user]}}, (err, documents) => {
    if (err) res.status(500).end(err.message)
    else res.json(documents)
  });
});

app.get('/joindocument', function(req, res) {
  Document.findById(req.query.id, (err, doc) => {
    if (err) res.status(500).end(err.message)
    else {
    doc.collaborators.push(req.user)}
    doc.save(err => {
      Document.find({collaborators: {$in: [req.user]}}, (err, documents) => {
        if (err) res.status(500).end(err.message)
        else res.json(documents)
      });
    })
  })
});
//$in is when you have collabortors, if this user is in this array of collaborators, then return it 

// GET request for individual document from documents list (by doc:id)
app.get('/document/:id', function(req, res) {
  Document.findById(req.params.id, (err, doc) => {
    if (err) res.status(500).end(err.message)
    else res.json(doc)
  });
});

// saving and editing the document's content
//how does it get req.body.id?????
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


server.listen(process.env.PORT || 3000)
module.exports = app;
