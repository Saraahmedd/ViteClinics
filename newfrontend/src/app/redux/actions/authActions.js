import axios from 'axios';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  FORGET_PASS_FAIL,
  FORGET_PASS_REQUEST,
  FORGET_PASS_SUCCESS,
  CHANGE_PASS_FAIL,
  CHANGE_PASS_REQUEST,
  CHANGE_PASS_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  RESET_PASS_FAIL,
  RESET_PASS_REQUEST,
  RESET_PASS_SUCCESS,
  USER_AUTHED_FAIL,
  USER_AUTHED_REQUEST
} from '../constants/authConstants';
import baseURL from '../baseURL';


export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    };
    const { data } = await axios.post(
      `${baseURL}/api/v1/user/login`,
      { username, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data.data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response
        ? error.response.data.message
        : 'Login failed. Please try again.',
    });
  }
};

export const authedAction = (type) => async (dispatch) => {
  try {
    dispatch({
      type: USER_AUTHED_REQUEST
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    };

    const { data } = await axios.get(
      `${baseURL}/api/v1/${type}/auth`,
      config
    );

    console.log('hogridger')

    dispatch({
      type: USER_LOGOUT_SUCCESS,
      payload: data.data,
    });
  } catch (e) {
    console.log(e);
    dispatch({
      type: USER_AUTHED_FAIL
    })

    window.location.href = '/guest/Login';
  }
}

export const registerAction = (reqBody) => async (dispatch) => {
  try {
    console.log("Registering")
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true

    };
    const { data } = await axios.post(
      `${baseURL}/api/v1/user/signup`,
      reqBody,
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data.data,
    });

    if (reqBody.role!=='administrator') {
      localStorage.setItem('userInfo', JSON.stringify(data));
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response
        ? error.response.data.message
        : 'Signup failed, Please try again.',
    });
  }
};

export const logoutAction = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGOUT_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    };
    const { data } = await axios.post(
      `${baseURL}/api/v1/user/logout`,
      {},
      config
    );

    dispatch({
      type: USER_LOGOUT_SUCCESS,
      payload: data.data,
    });

    localStorage.clear();
    window.location.href = '/guest/login'
  } catch (error) {
    dispatch({
      type: USER_LOGOUT_FAIL,
      payload: error.response
        ? error.response.data.message
        : 'Logout failed. Please try again.',
    });
  }
};

export const forgetPasswordAction = (reqBody) => async (dispatch) => {
  try {
    dispatch({
      type: FORGET_PASS_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    };
    const { data } = await axios.post(
      `${baseURL}/api/v1/user/forgotPassword`,
      reqBody,
      config
    );

    dispatch({
      type: FORGET_PASS_SUCCESS,
      payload: data.data,
    });

    localStorage.clear();
  } catch (error) {
    dispatch({
      type: FORGET_PASS_FAIL,
      payload: error.response
        ? error.response.data.message
        : 'Logout failed. Please try again.',
    });
  }
};

export const changePasswordAction = (reqBody) => async (dispatch) => {
  try {
    dispatch({
      type: CHANGE_PASS_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    };
    const { data } = await axios.patch(
      `${baseURL}/api/v1/user/changePassword`,
      reqBody,
      config
    );

    dispatch({
      type: CHANGE_PASS_SUCCESS,
      payload: data.data,
    });

    localStorage.clear();
  } catch (error) {
    dispatch({
      type: CHANGE_PASS_FAIL,
      payload: error.response
        ? error.response.data.message
        : 'failed. Please try again.',
    });
  }
};


export const resetPasswordAction = (reqBody) => async (dispatch) => {
  try {
    dispatch({
      type: RESET_PASS_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    };
    const { data } = await axios.patch(
      `${baseURL}/api/v1/user/resetPassword`,
      reqBody,
      config
    );

    dispatch({
      type: RESET_PASS_SUCCESS,
      payload: data.data,
    });

    localStorage.clear();
  } catch (error) {
    dispatch({
      type: RESET_PASS_FAIL,
      payload: error.response
        ? error.response.data.message
        : 'Logout failed. Please try again.',
    });
  }
};
