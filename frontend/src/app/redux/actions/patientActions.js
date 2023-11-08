import { PATIENTS_FILTERAPPOINTMENTS_FAIL, PATIENTS_FILTERAPPOINTMENTS_REQUEST, PATIENTS_FILTERAPPOINTMENTS_SUCCESS, PATIENT_DOWNLOAD_DOCS_FAIL, PATIENT_DOWNLOAD_DOCS_REQUEST, PATIENT_DOWNLOAD_DOCS_SUCCESS, PATIENT_FAIL, PATIENT_REQUEST,PATIENT_SUCCESS, PATIENT_UPLOAD_DOCS_FAIL, PATIENT_UPLOAD_DOCS_REQUEST, PATIENT_UPLOAD_DOCS_SUCCESS} from "../constants/patientConstants";
import { formulateQueryString } from '../queryStringBuilder';
import baseURL from '../baseURL';
import axios from 'axios';

export const getPatientAppointments = (queryObj) => async (dispatch) => {
    try {
      dispatch({
        type: PATIENTS_FILTERAPPOINTMENTS_REQUEST,
      });
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      };
  
      console.log(queryObj);
      const queryStr = formulateQueryString(queryObj)
      console.log(queryStr);
      let url;
  
      if (!queryObj)
        url = `${baseURL}/api/v1/appointment/get-patient-appointments`
      else
        url = `${baseURL}/api/v1/appointment/get-patient-appointments?${queryStr}`
      const { data } = await axios.get(
        url,
        config
      );
  
      dispatch({
        type: PATIENTS_FILTERAPPOINTMENTS_SUCCESS,
        payload: data.data,
      });
  
    } catch (error) {
      console.log(error)
      dispatch({
        type: PATIENTS_FILTERAPPOINTMENTS_FAIL,
        payload: error.response
          ? error.response.data.message
          : 'Error Retrieving PATIENTS APPOINTMENTS. Please try again.',
      });
    }
  };

  export const viewPatientDetails = (patientId) => async (dispatch) => {
    console.log(patientId);
    try {
      dispatch({
        type: PATIENT_REQUEST,
      });
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };
      let url ="";
      
      url=`${baseURL}/api/v1/patient//my-details`
      
      const { data } = await axios.get(url, config);
  
      dispatch({
        type: PATIENT_SUCCESS,
        payload: data.data.data[0],
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: PATIENT_FAIL,
        payload: error.response
          ? error.response.data.message
          : 'Fetching patient details failed. Please try again.',
      });
    }
  }

  export const uploadDocsAction = (formdata) => async (dispatch) => {
    console.log(patientId);
    try {
      dispatch({
        type: PATIENT_UPLOAD_DOCS_REQUEST,
      });
  
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type to 'multipart/form-data' for file upload
        },
        withCredentials: true,
      };
      let url ="";
      
      url=`${baseURL}/api/v1/patient/upload/medicalRecords`
      
      const { data } = await axios.post(url,formdata, config);
  
      dispatch({
        type: PATIENT_UPLOAD_DOCS_SUCCESS,
        payload: data.data.data[0],
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: PATIENT_UPLOAD_DOCS_FAILIL,
        payload: error.response
          ? error.response.data.message
          : 'Fetching patient details failed. Please try again.',
      });
    }
  }

  // /download

  export const downloadPatientDocs = (name) => async (dispatch) => {
    try {
      dispatch({
        type: PATIENT_DOWNLOAD_DOCS_REQUEST,
      });
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        responseType: 'stream',
        withCredentials: true,
      };
  
      const url = `${baseURL}/api/v1/patients/download?name=${name}`;
  
      const response = await axios.get(url, config);
  
      const contentDisposition = response.headers['content-disposition'];
      const fileName = "download";
  
      // Determine the file type based on the response content type
      const contentType = response.headers['content-type'];
      let fileType = 'application/pdf'; // Default to PDF
  
      if (contentType.includes('jpeg') || contentType.includes('jpg') || contentType.includes('png')) {
        fileType = contentType;
      }
  
      const blob = new Blob([response.data], { type: fileType });
  
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
  
      dispatch({
        type: PATIENT_DOWNLOAD_DOCS_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: PATIENT_DOWNLOAD_DOCS_FAIL,
        payload: error.response
          ? error.response.data.message
          : 'Downloading documents failed. Please try again.',
      });
    }
  };
  
  export const removeDocsAction = (name) => async (name) => {
    console.log(patientId);
    try {
      dispatch({
        type: PATIENT_UPLOAD_DOCS_REQUEST,
      });
  
      const config = {
    
        withCredentials: true,
      };
      let url ="";
      
      url=`${baseURL}/api/v1/patient/removeDoc/${name}`
      
      const { data } = await axios.delete(url,config);
  
      dispatch({
        type: PATIENT_UPLOAD_DOCS_SUCCESS,
        payload: data.data.data[0],
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: PATIENT_UPLOAD_DOCS_FAIL,
        payload: error.response
          ? error.response.data.message
          : ' Please try again.',
      });
    }
  }
  
  