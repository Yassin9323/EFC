const express = require('express');
const usersController = require('../controllers/userController');

const x = usersController;
const router = express.Router();

router.route('/').get(x.getAllUsers).post(x.createUser);
router.route('/:id').get(x.getUser).patch(x.updateUser).delete(x.deleteUser);

module.exports = router;
