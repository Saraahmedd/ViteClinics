const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.route("/deleteUser/:id").delete(userController.deleteUser);

module.exports = router;
