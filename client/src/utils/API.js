import axios from "axios";

export default {
  // Gets all runningStats
  getRunningStats: function() {
    return axios.get("/api/runningStats");
  },
  // Gets the runningStat with the given id
  getRunningStat: function(id) {
    return axios.get("/api/runningStats/" + id);
  },
  // Deletes the runningStat with the given id
  deleteRunningStat: function(id) {
    return axios.delete("/api/runningStats/" + id);
  },
  // Saves a runningStat to the database
  saveRunningStat: function(runningStatData) {
    return axios.post("/api/runningStats", runningStatData);
  },
  // Saves new challenge
  saveChallenge: function(challengeData) {
    return axios.post("/api/challenges", challengeData);
  },
  getChallenges: function() {
    return axios.get("/api/challenges");
  },
  updateChallenge: function(id, data) {
    return axios.put("/api/challenges/" + id, data);
  },
  deleteChallenge: function(id) {
    return axios.delete("/api/challenges/" + id);
  }
};

