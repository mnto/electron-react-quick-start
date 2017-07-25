const express = require('express');
const router = express.Router();
const session = require('express-session');
import { User, Document } from '../models/models';
const passport = require('passport');
import hashPassword from '../helper/passwordHash';

// passport middleware
// PASSPORT MIDDLEWARE HERE
router.use(passport.initialize());
router.use(passport.session());


router.post('/register', (req, res) => {
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

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));
