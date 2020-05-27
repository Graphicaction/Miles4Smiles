const db = require("../models");

// Defining methods for the userController
module.exports = {
//======newly added===========
getAllUsers: (req, res)=>{
  db.User
    .find()
    .then(users => {
      res.json({ users });
    })
    .catch(err => res.status(422).json(err));
},
findAll: (req, res)=>{
    db.User
      .find()
      .then(users => {
        res.json({ users });
      })
      .catch(err => res.status(422).json(err));
  },

  findById: (req, res) => {
    db.User
        .find({ _id: req.params.id })
        .then(user => {
          res.json({ user });
        })
        .catch(err => res.status(422).json(err));
  },
  //in case we want to remove users later too
  deleteUser: (req, res)=> {
    db.User
        .findOneAndDelete({ _id: req.params.id })
        .then(dbUser => res.json(dbUser))
        .catch(err => res.status(422).json(err));
  },
  //=============

  getUser: (req, res, next) => {
    if (req.user) {
      return res.json({ user: req.user });
    } else {
      return res.json({ user: null });
    }
  },
  register: (req, res) => {
    const { firstName, lastName, username, password, firstLogin } = req.body;
    // ADD VALIDATION
    db.User.findOne({ 'username': username }, (err, userMatch) => {
      if (userMatch) {
        return res.json({
          error: `Sorry, already a user with the username: ${username}`
        });
      }
      const newUser = new db.User({
        'firstName': firstName,
        'lastName': lastName,
        'username': username,
        'password': password,
        'firstLogin' : firstLogin,
      });
      newUser.save((err, savedUser) => {
        if (err) return res.json(err);
        return res.json(savedUser);
      });
    });
  },
  logout: (req, res) => {
    if (req.user) {
      req.session.destroy();
      res.clearCookie('connect.sid'); // clean up!
      return res.json({ msg: 'logging you out' });
    } else {
      return res.json({ msg: 'no user to log out!' });
    }
  },
  auth: function(req, res, next) {
		// console.log(req.body);
		next();
  },
  authenticate: (req, res) => {
		const user = JSON.parse(JSON.stringify(req.user)); // hack
		const cleanUser = Object.assign({}, user);
		if (cleanUser) {
			// console.log(`Deleting ${cleanUser.password}`);
			delete cleanUser.password;
		}
		res.json({ user: cleanUser });
  },
  //Updates a user data
  update: (req, res)=> {
    //Updating user when login for the first time
    db.User
      .findOneAndUpdate({ _id: req.params.id }, 
        {
          'city': req.body.userData.city,
          'state': req.body.userData.state,
          'averageDistance': req.body.userData.averageDistance,
          'averagePace': req.body.userData.averagePace,
          'avatar' : req.body.userData.avatar,
          'firstLogin': req.body.userData.firstLogin,
          'challengesWon': 0,
          'challengesTied': 0,
          'challengesLost': 0
        })
      .then(dbModel => {
        console.log(dbModel);
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },

  userUpdate: (req, res)=> {
    //Updating user when login for the first time
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => {
        console.log(dbModel);
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  }
};


