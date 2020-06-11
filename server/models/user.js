const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
mongoose.promise = Promise;

// Define userSchema
const userSchema = new Schema({
  googleId: { type: String },
  firstName: { type: String, unique: false },
  lastName: { type: String, unique: false },
  username: { type: String, unique: false, required: false },
  password: { type: String, unique: false, required: false },
  city: { type: String, unique: false },
  state: { type: String, unique: false },
  avatar: { type: String, unique: false },
  averageDistance: { type: Number, unique: false },
  averagePace: { type: String, unique: false },
  firstLogin: { type: Boolean, required: false },
  challengesWon: { type: Number, unique: false },
  challengesTied: { type: Number, unique: false },
  challengesLost: { type: Number, unique: false },
  runningStats: [
    {
      // Store ObjectIds in the array
      type: Schema.Types.ObjectId,
      // The ObjectIds will refer to the ids in the running stats model
      ref: 'RunningStat',
    },
  ],
});

// Define schema methods
userSchema.methods = {
  checkPassword: function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: (plainTextPassword) => {
    return bcrypt.hashSync(plainTextPassword, 10);
  },
};

// Define hooks for pre-saving
userSchema.pre('save', function (next) {
  if (!this.password) {
    // console.log('No password provided!');
    next();
  } else {
    this.password = this.hashPassword(this.password);
    next();
  }
});

// Create reference to User & export
const User = mongoose.model('User', userSchema);
module.exports = User;
