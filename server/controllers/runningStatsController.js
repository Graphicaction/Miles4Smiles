const ObjectId = require("mongoose").Types.ObjectId;
const db = require("../models");

// Defining methods for the runningStatsController
module.exports = {
  findAll: function(req, res) {
    if (req.user) {
      db.User
        .find({ _id: req.user._id })
        .populate({ path: "runningStats", options: { sort: { 'date': -1 } } })
        .then(users => {
          res.json({ runningStats: users[0].runningStats });
        })
        .catch(err => res.status(422).json(err));
    } else {
      return res.json({ runningStats: null });
    }
  },
  findById: function(req, res) {
    if (req.user) {
      db.User
        .find({ _id: req.user._id })
        .populate("runningStats")
        .then(users => {
          const runningStat = users[0].runningStats.filter(b => b._id.toString() === req.params.id);
          res.json({ runningStat: runningStat[0] });
        })
        .catch(err => res.status(422).json(err));
    } else {
      return res.json({ runningStat: null });
    }
  },
  create: function(req, res) {
    db.RunningStat
      .create(req.body)
      .then(dbRunningStat => {
        return db.User.findOneAndUpdate({ _id: req.user._id }, { $push: { runningStats: dbRunningStat._id } }, { new: true });
      })
      .then((dbUser) => {
        // If the User was updated successfully, send it back to the client
        res.json(dbUser);
      })
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.RunningStat
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => {
        console.log(dbModel);
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.User.findOneAndUpdate({ _id: req.user._id }, { $pull: { runningStats: new ObjectId(req.params.id) } }, { new: true })
      .then(() => {
        db.RunningStat
          .findOneAndDelete({ _id: req.params.id })
          .then(dbRunningStat => res.json(dbRunningStat))
          .catch(err => res.status(422).json(err));
      });
  }
};
