const passport = require('passport');
const router = require('express').Router();
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
    successRedirect: '/',
    failureRedirect: '/login',
  })
);
