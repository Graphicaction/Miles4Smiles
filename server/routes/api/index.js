const router = require("express").Router();
const runningStatRoutes = require("./runningStats");
const challengeRoutes = require("./challenge");

// Running Stat and Challenge routes
router.use("/runningStats", runningStatRoutes);
router.use("/challenge", challengeRoutes);

module.exports = router;
