const router = require("express").Router();
const runningStatRoutes = require("./runningStats");
const challengeRoutes = require("./challenge");
const usersRoutes = require("./userData");

// Running Stat and Challenge routes
router.use("/runningStats", runningStatRoutes);
router.use("/challenges", challengeRoutes);
router.use("/users", usersRoutes);

module.exports = router;
