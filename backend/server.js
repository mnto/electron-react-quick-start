const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');

const mongoose = require('mongoose');
import { User } from './models/models';
import hashPassword from './helper/passwordHash';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//connect to mongoDB
const connect = process.env.MONGODB_URI || require('./models/connect');
mongoose.connect(connect);

//passport setup
const LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({ username: username }, function(err, user) {
      if (err) {
        return done(err);
      }
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

app.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  var hashed = hashPassword(password);
  if(!username){
    res.send('error: username cannot be empty');
    return;
  }
  if(!password){
    res.send('error: password cannot be empty');
    return;
  }
  User.findOne({username: username})
  .then((found) => {
    if(found){
      res.send('error: Username already exists');
    } else {
      const newUser = new User({
        username: username,
        password: hashed
      });
      newUser.save()
      .then(() => {
        res.redirect('/login');
      })
      .catch(() => {
        console.log("Database error saving user");
        res.send({error: "database error"});
      });
    }
  });
});





app.listen(3000, function () {
  console.log('Backend server for Electron App running on port 3000!');
});
