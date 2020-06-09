const passport = require('passport');
const router = require('express').Router();
const userController = require('../../controllers/userController');
require('../../passport/GoogleStrategy');

module.exports = router;

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    successRedirect: '/',
  }),
  passport.authenticate('local'),
  userController.googleLogin
);
