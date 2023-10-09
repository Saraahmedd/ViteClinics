import { configureStore } from '@reduxjs/toolkit';
import {loginReducer, registerReducer} from './reducers/authReducer';
import {removeUserReducer} from './reducers/userReducer';
import {getDrsForPatientsReducer} from './reducers/doctorReducer';

const store = configureStore({
  reducer: {
    loginReducer,
    registerReducer,
    removeUserReducer,
    getDrsForPatientsReducer,
    createHealthPackageReducer,
    getHealthPackagesReducer,
    getHealthPackageReducer,
    updateHealthPackageReducer,
    deleteHealthPackageReducer
  },
});

export default store;
