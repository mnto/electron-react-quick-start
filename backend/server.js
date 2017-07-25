const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


// import API routes
const routes = require('./routes/routes');
const auth = require('./routes/auth');

import { User } from './models/models';
import hashPassword from './helper/passwordHash';

const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//connect to mongoDB
const mongoose = require('mongoose');
const connect = process.env.MONGODB_URI || require('./models/connect');
mongoose.connect(connect);

//passport setup
app.use(session({
  secret: process.env.SECRET,
  cookie: {
    // In milliseconds, i.e., five minutes
    maxAge: 1000 * 60 * 5
  },
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});


passport.use(new LocalStrategy( (username, password, done) => {
  const hash = hashPassword(password);

  // Find the user with the given username
  User.findOne({username: username})
    .then((user) => {
      // if no user present, auth failed
      if (!user) {
        console.log(user);
        return done(null, false, {message: 'Incorrect username.'});
      }
      // if passwords do not match, auth failed
      if (user.password !== hash) {
        return done(null, false, {message: 'Incorrect password.'});
      }
      // auth has has succeeded
      return done(null, user);
    })
    .catch((err) => {
      console.log(err);
      return done(err);
    });
}));


app.use('/', auth(passport));
app.use('/', routes);

app.listen(3000, function () {
  console.log('Backend server for Electron App running on port 3000!');
});
