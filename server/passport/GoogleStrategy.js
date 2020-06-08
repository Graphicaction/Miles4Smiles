const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const keys = require('../config/keys');
const db = require('../models');

//place mongo generated id in the cookie
passport.serializeUser((user, done) => {
  done(null, user.googleId);
  console.log('serialize');
});
//get id out of cookie
passport.deserializeUser((googleId, done) => {
  db.User.findById(googleId).then((user) => {
    done(null, user);
    console.log('deseralize');
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      passReqToCallback: true,
      proxy: true,
    },
    (request, accessToken, refreshToken, profile, done) => {
      db.User.findOne({ googleId: profile.id }).then((existingUser) => {
        //if already signed up with that googleid no new user
        if (existingUser) {
          console.log(existingUser);
          done(null, existingUser);
        } else {
          console.log('accessToken', accessToken);
          console.log('refresh Token', refreshToken);
          console.log('profile', profile);
          new db.User({
            googleId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            username: profile.givenName,
            password: profile.id,
            firstLogin: true,
            // password:""
          })
            .save()
            .then((user) => done(null, user));
        }
      });
    }
  )
);
