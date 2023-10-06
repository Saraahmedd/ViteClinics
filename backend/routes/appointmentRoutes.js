const express = require('express');
const appointmentController = require('../controllers/appointmentController');
const router = express.Router();
const { protect } = require('../controllers/authController');

router.use(protect);

router.get('/get-patient-appointments', appointmentController.getAllPatientAppointments);
router.get('/get-doctor-appointments', appointmentController.getAllDoctorAppointments);

router.get('/:id', appointmentController.getAppointment);


module.exports = router;