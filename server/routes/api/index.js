const router = require("express").Router();
const runningStatRoutes = require("./runningStats");

// Book routes
router.use("/runningstats", runningStatRoutes);

module.exports = router;
