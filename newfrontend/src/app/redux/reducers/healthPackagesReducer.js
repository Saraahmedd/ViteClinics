import {
    HEALTH_PACKAGES_LIST_REQUEST,
    HEALTH_PACKAGES_LIST_SUCCESS,
    HEALTH_PACKAGES_LIST_FAIL,

    HEALTH_PACKAGE_DETAILS_REQUEST,
    HEALTH_PACKAGE_DETAILS_SUCCESS,
    HEALTH_PACKAGE_DETAILS_FAIL,

    HEALTH_PACKAGE_CREATE_REQUEST,
    HEALTH_PACKAGE_CREATE_SUCCESS,
    HEALTH_PACKAGE_CREATE_FAIL,

    HEALTH_PACKAGE_UPDATE_REQUEST,
    HEALTH_PACKAGE_UPDATE_SUCCESS,
    HEALTH_PACKAGE_UPDATE_FAIL,

    HEALTH_PACKAGE_DELETE_REQUEST,
    HEALTH_PACKAGE_DELETE_SUCCESS,
    HEALTH_PACKAGE_DELETE_FAIL,
} from '../constants/healthPackagesConstants';

const getHealthPackagesInitialState = {
    healthPackages: [],
    loading: false,
    error: null,
};
const getHealthPackageInitialState = {
    healthPackage: {},
    loading: false,
    error: null,
};
const createHealthPackageInitialState = {
    healthPackage: {},
    loading: false,
    error: null,
};
const updateHealthPackageInitialState = {
    healthPackage: {},
    loading: false,
    error: null,
};

const deleteHealthPackageInitialState = {
    loading: false,
    error: null,
};

export const getHealthPackagesReducer = (state = getHealthPackagesInitialState, action) => {
    switch (action.type) {
        case HEALTH_PACKAGES_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case HEALTH_PACKAGES_LIST_SUCCESS: {
            return {
                ...state,
                healthPackages: action.payload,
                loading: false,
                error: null,
            }
        };
        case HEALTH_PACKAGES_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}
export const getHealthPackageReducer = (state = getHealthPackageInitialState, action) => {
    switch (action.type) {
        case HEALTH_PACKAGE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case HEALTH_PACKAGE_DETAILS_SUCCESS:
            return {
                ...state,
                healthPackage: action.payload,
                loading: false,
                error: null,
            };
        case HEALTH_PACKAGE_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}
export const createHealthPackageReducer = (state = createHealthPackageInitialState, action) => {
    switch (action.type) {
        case HEALTH_PACKAGE_CREATE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case HEALTH_PACKAGE_CREATE_SUCCESS:
            return {
                ...state,
                healthPackage: action.payload,
                loading: false,
                success:true,
                error: null,
            };
        case HEALTH_PACKAGE_CREATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}
export const updateHealthPackageReducer = (state = updateHealthPackageInitialState, action) => {
    switch (action.type) {
        case HEALTH_PACKAGE_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: null,
            };
        case HEALTH_PACKAGE_UPDATE_SUCCESS:
            return {
                ...state,
                healthPackage: action.payload,
                success : true , 
                loading: false,
                error: null,
            };
        case HEALTH_PACKAGE_UPDATE_FAIL:
            return {
                ...state,
                loading: false,
                success : false,
                error: action.payload,
            };
        default:
            return state;
    }
}
export const deleteHealthPackageReducer = (state = deleteHealthPackageInitialState, action) => {
    switch (action.type) {
        case HEALTH_PACKAGE_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case HEALTH_PACKAGE_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                success:true,
                error: null,
            };
        case HEALTH_PACKAGE_DELETE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}
