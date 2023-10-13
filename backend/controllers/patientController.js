const handlerFactory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const Patient = require("../models/patientModel");
const Prescription = require("../models/prescriptionModel");
const Appointment = require("../models/appointmentModel");
const Doctor = require("../models/doctorModel");
const APIFeatures = require('../utils/apiFeatures');
const AppError = require("../utils/appError");

//TODO: Retrieve only my patient
exports.getPatient = handlerFactory.getOne(Patient);

exports.getAllPrescriptions = catchAsync(async (req, res, next) => {
  console.log(req.user._id);
  const patient = await Patient.findOne({ user: req.user._id });
  const patientId = patient._id;
  const features = new APIFeatures(Prescription.find({ patientId: patientId }).populate("doctorId"), req.query).filter();
  const presc = await features.query;

    res.status(200).json({
        status: 'success',
        results: presc.length,
        data: {
            data: presc
        }
    });
});

exports.getPrescription = catchAsync(async (req, res, next) => {
  const patient = await Patient.findOne({ user: req.user._id });
  const patientId = patient._id;

  const data = await Prescription.findOne({
    patientId: patientId,
    _id: req.params.id,
  });
  res.status(200).json({
    status: "success",
    data: {
      data,
    },
  });
});

exports.viewMyPatients = catchAsync(async (req, res, next) => {

  const doctor = await Doctor.findOne({ user: req.user._id });
  let doctorId;
  let appointments;
  let data;
  if (doctor) {
    doctorId = doctor._id;
    appointments = await Appointment.find({ doctorId }).populate("patient");
    data = appointments.map((appointment) => appointment.patient);
  }

  if (req.query.name)
    data = data.filter((pat) => `${pat.name}`.includes(req.query.name));
  if(req.user.role === 'patient')
    data = await Patient.find({_id: req.query._id})
  res.status(200).json({
    status: "success",
    results: data?.length,
    data: {
      data: data,
    },
  });
});

exports.getAllPatients = handlerFactory.getAll(Patient);

exports.FilterPatientsBasedOnUpcomimgAppointments = catchAsync(
  async (req, res, next) => {
    const doctor = await Doctor.findOne({ user: req.user._id });
    const doctorId = doctor._id;
    const upcomingAppointments = await Appointment.find({
      doctorId: doctorId,
      status: "Upcoming", // Find appointments with dates greater than or equal to the current date
    });

    // Extract patient IDs from upcomingAppointments
    const patientIds = upcomingAppointments.map(
      (appointment) => appointment.patientId
    );

    // Query the Patient collection to fetch patient details for the extracted patient IDs
    const patients = await Patient.find({ _id: { $in: patientIds } });

    // Create a response object that combines patient details with their appointment details
    // const response = patients.map((patient) => {
    //   const matchingAppointment = upcomingAppointments.find(
    //     (appointment) =>
    //       appointment.patientId.toString() === patient._id.toString()
    //   );
    //   return 
    //     patient
    //     // appointment: matchingAppointment,
      
    // });
    // console.log()
    res.status(200).json({
      status: "success",
      // results: response?.length,
      data: {
        data: patients,
      },
    });
  }
);
