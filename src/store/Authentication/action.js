import axios from "axios";

import {
    AUTHENTICATION_REQUEST,
    AUTHENTICATION_SUCCESS,
    AUTHENTICATION_ERROR,
} from "./type";

const authenticationRequest = () => {
    return {
        type: AUTHENTICATION_REQUEST,
    }
}

export const authenticationSuccess = (user, status) => {
    return {
        type: AUTHENTICATION_SUCCESS,
        user: user,
        status: status
    }
}

const authenticationError = () => {
    return {
        type: AUTHENTICATION_ERROR,
    }
}

export const register = (data, successCB, errorCB) => {
    return async (dispatch) => {
        dispatch(authenticationRequest());

        try {
            await axios.post("http://localhost:8000/authentication/register", data);

            dispatch(authenticationSuccess(null, false));
            
            return successCB();
        }
        catch(e) {
            dispatch(authenticationError());

            const error = e?.response?.data?.error;
        
            if(error && error?.code === "VALIDATION_FAILED")
                return errorCB("One or more fields is invalid.", error.errors);

            if(error && error?.code === "EMAIL_ALREADY_REGISTERED")
                return errorCB("Email is already registered.", { email: true });
            
            return errorCB("Unable to process request. Try again.");
        }
    }
}

export const login = (data, successCB, errorCB) => {
    return async (dispatch) => {
        dispatch(authenticationRequest());

        try {
            const body = {
                email: data.email,
                password: data.password,
            };
            const response = await axios.post("http://localhost:8000/authentication/login", body);
            const user = response.data.data.user;

            dispatch(authenticationSuccess(user, true));
        
            return successCB(user.role);
        }
        catch(e) {
            dispatch(authenticationError());

            const error = e?.response?.data?.error;

            if(error && error?.code === "VALIDATION_FAILED")
                return errorCB("One or more fields is invalid.", error.errors);

            if(error && error?.code === "EMAIL_NOT_REGISTERED")
                return errorCB("Email is not registered.", { email: true });
            
            if(error && error?.code === "WRONG_PASSWORD")
                return errorCB("Password entered is incorrect.", { password: true });
        
            return errorCB("Unable to process request. Try again.");
        }
    }
}

export const logout = (successCB, errorCB) => {
    return async (dispatch) => {
        dispatch(authenticationRequest());

        try {
            await axios.get("http://localhost:8000/authentication/logout");
            dispatch(authenticationSuccess(null, false));        
        }
        catch(e) {
            dispatch(authenticationError());

            return errorCB("Unable to logout. Try again.");
        }
        return successCB();
    }
}