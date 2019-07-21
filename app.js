const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const app = express();

// make userId available in templates
app.use((req, res, next) => {
	res.locals.currentUser = req.session.userId;
	next();
});

// mongodb connection
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

const mongoUrl = config.serverUrl;

mongoose.connect(mongoUrl, { useNewUrlParser: true }, function(err, db) {
    if (err) { console.log('Oh no... Error:', err); }
});

const connection = mongoose.connection;
const users;

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function () {
    connection.db.collection('users', function(err, collection){
        collection.find({}).toArray(function(err, data){
        	users = data;
        })
    });
});

// use sessions for tracking logins
app.use(session({
  secret: 'The shnozberries taste like chicken',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: connection
  })
}));

// parse incomming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from /public
app.use(express.static(__dirname + '/public'));

// view engine setup
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// include routes
const routes = require('./routes/index');
app.use('/', routes);

// _______ Local 'database' file _______
const data = require('./data.js');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


app.listen(5000, () => console.log('App listening on port 5000'));

