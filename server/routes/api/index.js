const router = require("express").Router();
const runningStatRoutes = require("./runningStats");
const challengeRoutes = require("./challenge");

// Running Stat routes
router.use("/runningstats", runningStatRoutes);
router.use("/challenge", challengeRoutes);

module.exports = router;
