const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Define runningStat schema
const runningStatsSchema = new Schema({
  pace: { type: Number, required: true },
  distance: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  totalTime: { type: Number, required: true}
});
// Create reference to RunningStat & export
const RunningStat = mongoose.model("RunningStat", runningStatsSchema);

module.exports = RunningStat;
