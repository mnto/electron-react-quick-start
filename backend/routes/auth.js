// Add Passport-related auth routes here.

const express = require('express');
const router = express.Router();
import  { User } from '../models/models';
const hashPassword = require('../helper/passwordHash');

auth = (passport) => {

  // GET Login page
  router.get('/login', function(req, res) {
    // res.render('login');
  });

  // POST Login page
  router.post('/login', passport.authenticate('local'), (req, res) => {
    res.redirect('/');
  });

  // GET Logout page
  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
  });

  // These will only work for mongo strategies.

  // GET registration page
  router.get('/register', (req, res) => {
    // res.render('signup');
  });

  router.post('/register', (req, res) => {
    const password;
    // Unhashed version
    // password = req.body.password;
    // Hashed version
    password = hashPassword(req.body.password);

    const u = new User({
      username: req.body.username,
      password: password
    });
    u.save((err, user) => {
      if (err) {
        console.log(err);
        res.status(500).redirect('/register');
        return;
      }
      console.log(user);
      res.redirect('/login');
    });
  });

  return router;
};

export default auth;
