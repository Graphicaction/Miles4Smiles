const ObjectId = require("mongoose").Types.ObjectId;
const db = require("../models");

// Defining methods for the challengeController
module.exports = {
  findAll: function(req, res) {
    db.Challenge
        .find()
        .then(challenges => {
          res.json({ challenges });
        })
        .catch(err => res.status(422).json(err));
 },
  findById: function(req, res) {
    db.Challenge
        .find({ _id: req.params.id })
        .then(challenge => {
          res.json({ challenge });
        })
        .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Challenge
      .create(req.body)
      .then((dbChallenge) => {
        // If the Challenge was created successfully, send it back to the client
        res.json(dbChallenge);
      })
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    //console.log(req.body);
    db.Challenge
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbChallenge => {
        console.log(dbChallenge);
        res.json(dbChallenge);
      })
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Challenge
        .findOneAndDelete({ _id: req.params.id })
        .then(dbChallenge => res.json(dbChallenge))
        .catch(err => res.status(422).json(err));
  }
  
};
