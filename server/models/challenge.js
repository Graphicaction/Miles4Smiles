const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Define Challenge Schema
const ChallengeSchema = new Schema({
  businessName: { type: String, required: true },
  businessType: { type: String, required: false },
  businessLocation: { type: String, required: false },
  businessUrl: { type: String, required: false },
  challengers: [{ type: String, required: false }],
  distance: { type: Number, required:false },
  doner:{ type: String, required: false },
  donatedAmount: { type: Number, required: false}
});
// Create reference to Challenge & export
const Challenge = mongoose.model("Challenge", ChallengeSchema);

module.exports = Challenge;