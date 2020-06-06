const express = require('express');
const router = express.Router();
const passport = require('../../passport');
const userController = require("../../controllers/userController");

// this route is just used to get the user basic info
router.get('/user', userController.getUser);
router.get('/users', userController.getAllUsers);
router.post('/login', userController.auth, passport.authenticate('local'), userController.authenticate);
router.post('/logout', userController.logout);
router.post('/signup', userController.register);
router.put('/signup/:id', userController.update); 
router.put('/user/:id', userController.userUpdate);
router.delete('/user/:id', userController.deleteUser)


//google Oauth
router.get("/google/auth", passport.authenticate('google', {
  scope: ['profile', 'email']
  }))
// router.post('/login', userController.auth, passport.authenticate('google'), userController.authenticate);

router.get("/auth/google/callback", passport.authenticate('google'));
router.get("/logout", (req, res) =>{
    req.logout();
    res.send(req.user);
  }) 
router.get('/user/:id', (req, res) => {
    res.send(req.user)
  })

module.exports = router;
