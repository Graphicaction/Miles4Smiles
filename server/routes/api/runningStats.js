const router = require('express').Router();
const runningStatsController = require('../../controllers/runningStatsController');

// Matches with "/api/runningStats"
router
  .route('/')
  .get(runningStatsController.findAll)
  .post(runningStatsController.create);

// Matches with "/api/runningStats/:id"
router
  .route('/:id')
  .get(runningStatsController.findById)
  .put(runningStatsController.update)
  .delete(runningStatsController.remove);

module.exports = router;
