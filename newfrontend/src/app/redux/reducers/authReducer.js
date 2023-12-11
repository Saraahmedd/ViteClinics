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
  CHANGE_PASS_SUCCESS,
  CHANGE_PASS_REQUEST,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_REQUEST,
  RESET_PASS_FAIL,
  RESET_PASS_SUCCESS,
  RESET_PASS_REQUEST,
  USER_AUTHED_REQUEST,
  USER_AUTHED_FAIL,
  USER_AUTHED_SUCCESS
} from '../constants/authConstants';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case USER_LOGIN_SUCCESS: {
      console.log("success")
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      }
    };
    case USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const authedReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_AUTHED_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        isAuthenticated: false,
      };
      break;
    case USER_AUTHED_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        isAuthenticated: false,
      };
      break;
    case USER_AUTHED_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        isAuthenticated: true,
      };
      break;
    default:
      return state;
  }
};

export const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        isAuthenticated: false,
      };
    case USER_REGISTER_SUCCESS: {
      console.log("success")
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        success:true,
        error: null,
      }
    };
    case USER_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
export const logoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case USER_LOGOUT_SUCCESS: {
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: null,
      }
    };
    case USER_LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const forgetPasswordReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case FORGET_PASS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false
      };
    case FORGET_PASS_SUCCESS: {
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: null,
        success: true
      }
    };
    case FORGET_PASS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false
      };
    default:
      return state;
  }
};

export const resetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case RESET_PASS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false
      };
    case RESET_PASS_SUCCESS: {
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: null,
        success: true,
      }
    };
    case RESET_PASS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false
      };
    default:
      return state;
  }
};

export const changePasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PASS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false
      };
    case CHANGE_PASS_SUCCESS: {
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: null,
        success: true
      }
    };
    case CHANGE_PASS_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};