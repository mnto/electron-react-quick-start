// Add Passport-related auth routes here.

const express = require('express');
const router = express.Router();
const  { User } = require('../models/models');
const hashPassword = require('../helper/passwordHash');

var auth = (passport) => {

  // GET Login page
  router.get('/', function(req, res) {
    // res.render('login');
    res.send({message: "Should be on login page"});
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
    console.log('HELLO HERE IN REG')
    const password = hashPassword(req.body.password);

    const newUser = new User({
      username: req.body.username,
      password: password
    });

    newUser.save()
    .then((user)=>{
      console.log(user);
      res.send({success: true});
      res.redirect('/login');
    })
    .catch((err)=>{
      console.log(err);
      res.status(500).redirect('/register');
    });
  });

  return router;
};
module.exports = auth;
