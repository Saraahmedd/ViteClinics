const express = require('express');
const doctorController = require('../controllers/doctorController');
const router = express.Router();

router.route("/:id").get(doctorController.getDoctor);

module.exports = router;
