const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Define runningStat schema
const runningStatsSchema = new Schema({
  pace: { type: String, required: false },
  distance: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  totalTime: { type: String, required: true}
});
// Create reference to RunningStat & export
const RunningStat = mongoose.model("RunningStat", runningStatsSchema);

module.exports = RunningStat;
