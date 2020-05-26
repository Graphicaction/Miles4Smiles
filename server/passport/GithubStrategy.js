// const passport = require("passport");
// const GithubStrategy = require("passport-github2").Strategy;
// const mongoose = require("mongoose");
// const User = mongoose.model('User');
// const keys = require("../config/keys");

// //place mongo generated id in the cookie
// passport.serializeUser((user, done) =>{
//   done(null, user.id);
// });
// //get id out of cookie
// passport.deserializeUser((id, done)=>{
//   User.findById(id)
//   .then(user => {
//     done(null, user);
//   });
// });

// passport.use(
//   new GithubStrategy(
//     {
//       clientID: keys.GITHUB_CLIENT_ID,
//       clientSecret: keys.GITHUB_CLIENT_SECRET,
//       callbackURL: "https://localhost/3001/auth/github/callback",
//       proxy: true
//     }, 
//     (accessToken, refreshToken, profile, done) => {
//       User.findOne({ githubId : profile.id })
//       .then((existingUser)=>{
//         //if already signed up with that googleid no new user
//         if(existingUser){
//           done(null, existingUser);
//         } else {
//           console.log("accessToken", accessToken);
//           console.log("refresh Token", refreshToken);
//           console.log("profile", profile);
//           // new User({ 
//           //   googleId: profile.id,
//           //   firstName: profile.name.givenName,
//           //   lastName: profile.name.familyName,
//           //   username: profile.displayName 
//           //   // password:""
//           // }).save()
//           // .then(user => done(null, user));

//           }
//         })

//       })
//   );