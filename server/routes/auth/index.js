const express = require('express');
const router = express.Router();
const passport = require('../../passport');
const userController = require('../../controllers/userController');

//in case we add google oauth later
//const googleRoutes = require('./Googleauth');
// router.use('/', googleRoutes);

// this route is just used to get the user basic info
router.get('/user', userController.getUser);
router.get('/users', userController.getAllUsers);
router.post(
  '/login',
  userController.auth,
  passport.authenticate('local'),
  userController.authenticate
);
router.post('/logout', userController.logout);
router.post('/signup', userController.register);
router.put('/signup/:id', userController.update);
router.put('/user/:id', userController.userUpdate);
router.delete('/user/:id', userController.deleteUser);

module.exports = router;
