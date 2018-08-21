const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  console.log(user);
  console.log(done);
  console.log('calling serialize user');
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('calling deserialize user');
  User.findById(id)
  .then(user => {
    done(null, user);
  })
})

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
    console.log('calling this first');
      User.findOne({ googleID: profile.id }).then(existingUser => {
        if(existingUser) {
          done(null, existingUser);
        } else {
          new User({googleID: profile.id})
          .save()
          .then(user => done(null, user));
        }
      })
    }
  )
);
