import { configureStore } from '@reduxjs/toolkit';
import {loginReducer, registerReducer} from './reducers/authReducer';
import {removeUserReducer, getUsersReducer} from './reducers/userReducer';
import {addFamilyMembersReducer} from './reducers/FamilyMembersReducer';
import { viewFamilyMembersReducer } from './reducers/FamilyMembersReducer';
import { patientsReducer } from './reducers/patientsReducers';
import { doctorReducer } from './reducers/doctorReducers';
import { prescriptionReducer } from './reducers/prescriptionsReducers';
import { viewAllPrescriptionsReducer } from './reducers/prescriptionsReducers';
import { filterPatientsBasedOnUpcomingAppointmentsReducer } from './reducers/patientsReducers';
import {getDrsForPatientsReducer} from './reducers/doctorReducer';
import { viewPatientsAppointmentsReducer } from './reducers/patientReducer';
import { viewDoctorPatientsReducer } from './reducers/doctorReducer';
import { updateDoctorsReducer } from './reducers/doctorReducer';
import { viewDoctorsAppointmentsReducer } from './reducers/doctorReducer';
import { createHealthPackageReducer, getHealthPackagesReducer, getHealthPackageReducer, updateHealthPackageReducer, deleteHealthPackageReducer } from './reducers/healthPackagesReducer';


const store = configureStore({
  reducer: {
    loginReducer,
    registerReducer,
    removeUserReducer,
    addFamilyMembersReducer,
    viewFamilyMembersReducer,
    patientsReducer,
    doctorReducer,
    prescriptionReducer,
    viewAllPrescriptionsReducer,
    filterPatientsBasedOnUpcomingAppointmentsReducer,
    getDrsForPatientsReducer,
    viewPatientsAppointmentsReducer,
    viewDoctorPatientsReducer,
    updateDoctorsReducer,
    viewDoctorsAppointmentsReducer,
    createHealthPackageReducer,
    getHealthPackagesReducer,
    getHealthPackageReducer,
    updateHealthPackageReducer,
    deleteHealthPackageReducer,
    getUsersReducer,
  },
});

export default store;
