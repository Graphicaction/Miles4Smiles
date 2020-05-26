const express = require('express');
const router = express.Router();
const passport = require('../../passport');
const userController = require("../../controllers/userController");

// this route is just used to get the user basic info
router.get('/user', userController.getUser)
router.post('/login', userController.auth, passport.authenticate('local'), userController.authenticate);
router.post('/logout', userController.logout);
router.post('/signup', userController.register);
router.put('/signup/:id', userController.update); 
router.put('/user/:id', userController.userUpdate);

router.get("/google", passport.authenticate('google', {
  scope: ['profile', 'email']
  }))
// router.get("/google" )

module.exports = router;
