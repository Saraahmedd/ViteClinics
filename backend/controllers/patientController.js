const Patient = require('../models/patientModel');
const Prescription = require('../models/prescriptionModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory')
const mongoose = require('mongoose');

const getPatientIdFromUserId = catchAsync(async (userId) => {
    const patient = await Patient.findOne({user: userId});
    // console.log(patient);
    return patient._id;
});

exports.getAllPrescriptions = catchAsync(async (req, res, next) => {
    const patientId = await getPatientIdFromUserId(req.user._id);
    req.query['patientId'] = {"eq": patientId};
    factory.getAll(Prescription)(req, res, next);
});

exports.getPrescription = catchAsync(factory.getOne(Prescription));