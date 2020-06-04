const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model('User');
const keys = require("../config/keys");
const db = require("../models");


//place mongo generated id in the cookie
passport.serializeUser((user, done) =>{
  done(null, user.id);
});
//get id out of cookie
passport.deserializeUser((id, done)=>{
  User.findById(id)
  .then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    }, 
    (accessToken, refreshToken, profile, done) => {
      db.User.findOne({ googleId : profile.id })
      .then((existingUser)=>{
        //if already signed up with that googleid no new user
        if(existingUser){
          done(null, existingUser);
        } else {
          console.log("accessToken", accessToken);
          console.log("refresh Token", refreshToken);
          console.log("profile", profile);
          new db.User({ 
            googleId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            username: profile.displayName 
            // password:""
          }).save()
          .then(user => done(null, user));

          }
        })

      })
  );