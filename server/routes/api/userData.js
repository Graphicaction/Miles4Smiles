const router = require('express').Router();
const userController = require('../../controllers/userController');

// Matches with "/api/users"
router.route('/').get(userController.findAll);

// Matches with "/api/user/:id"
router.route('/:id').get(userController.findById).put(userController.update);

module.exports = router;
