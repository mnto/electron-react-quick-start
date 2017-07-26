// All Passport-related auth routes here
const express = require('express');
const router = express.Router();
const  { User } = require('../models/models');
const hashPassword = require('../helper/passwordHash');

// export auth as a function that takes passport as an argument and,
// when called in server.js, runs passport authentication on the user
var auth = (passport) => {

  // GET Login page
  router.get('/', function(req, res) {
    // res.render('login');
    res.send({message: "Should be on login page"});
  });

  // POST Login page
  router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({id: req.session.passport.user});
  });

  // GET Logged-In verification
  // This is called upon componentDidMount on Document Portal page after successful user login
  // and helps us verify that a user is still logged in.
  router.get('/user/logged-in', (req, res) => {
    res.json({user: req.user});
  });

  // GET user ID
  // Called within the same componentDidMount on Document Portal page and is
  // used to pass down the user id as a prop to NewDocModal for creating new documents
  router.get('/userID', (req, res) => {
    res.json({id: req.session.passport.user});
  });

  // GET Logout
  // Ends the session and redirects to login
  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  // // GET registration page
  // router.get('/register', (req, res) => {
  //   res.render('signup');
  // });

// POST registration
// Creates and saves new user in database, redirects to /login upon success
  router.post('/register', (req, res) => {
    const password = hashPassword(req.body.password);

    const newUser = new User({
      username: req.body.username,
      password: password
    });

    newUser.save()
    .then((user)=>{
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
