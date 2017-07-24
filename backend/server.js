const express = require('express');
const app = express();

//connect to mongoDB
const mongoose = require('mongoose');

const connect = process.env.MONGODB_URI || require('./models/connect');
mongoose.connect(connect);

//passport setup
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

import { User } from './models/models';

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

// Example route
app.get('/', function (req, res) {
  res.send('Hello World!');
});



app.listen(3000, function () {
  console.log('Backend server for Electron App running on port 3000!');
});
