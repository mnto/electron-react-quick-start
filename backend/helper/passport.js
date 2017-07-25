const passport = require('passport');
const models = require('./models/models');
const LocalStrategy = require('passport-local').Strategy;

const User = models.User;

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

// export default passportConnect;
