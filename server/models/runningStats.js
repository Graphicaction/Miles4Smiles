const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const runningStatsSchema = new Schema({
  pace: { type: Number, required: true },
  distance: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  totalTime: { type: Number, required: true}
});

const RunningStats = mongoose.model("RunningStats", runningStatsSchema);

module.exports = RunningStats;
