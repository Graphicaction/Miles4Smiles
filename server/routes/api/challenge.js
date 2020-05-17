const router = require("express").Router();
const challengeController =  require("../../controllers/challengeController");

// Matches with "/api/challenge"
router.route("/")
  .get(challengeController.findAll)
  .post(challengeController.create);

// Matches with "/api/challenge/:id"
router
  .route("/:id")
  .get(challengeController.findById)
  .put(challengeController.update)
  .delete(challengeController.remove);

module.exports = router;