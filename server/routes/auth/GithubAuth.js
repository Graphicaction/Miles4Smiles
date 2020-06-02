const passport = require('passport');

module.exports =(app) => {
  app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));
 
app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/welcome' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/welcome');
  });

  // app.get("/api/logout", (req, res) =>{
  //   req.logout();
  //   res.send(req.user);
  // })
  
  // app.get('/api/current_user', (req, res) => {
  //   res.send(req.user)
  // })

};