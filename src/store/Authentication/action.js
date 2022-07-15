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

export const authenticationSuccess = (user, token, status) => {
    return {
        type: AUTHENTICATION_SUCCESS,
        user: user,
        token: token,
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
            const body = {
                name: data.name,
                mobile_number: data.mobileNumber,
                blood_group: data.bloodGroup.value,
                email: data.email,
                password: data.password,
            };

            await axios.post("http://localhost:8000/authentication/register", body);

            dispatch(authenticationSuccess(null, false));
            
            return successCB();
        }
        catch(e) {
            const error = e.response.data.error;

            dispatch(authenticationError());

            if(error.code === "EMAIL_ALREADY_REGISTERED")
                return errorCB("Email is already registered.");
            
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
            const token = response.data.data.token;
            const user = response.data.data.user;

            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);

            dispatch(authenticationSuccess(user, token, true));

            console.log("Role from action:", user.role);

            return successCB(user.role);
        }
        catch(e) {
            const error = e.response.data.error;

            dispatch(authenticationError());

            if(error.code === "EMAIL_NOT_REGISTERED")
                return errorCB("Email is not registered.");
            
            if(error.code === "WRONG_PASSWORD")
                return errorCB("Password entered is incorrect.");
        
            return errorCB("Unable to process request. Try again.");
        }
    }
}

export const logout = (successCB, errorCB) => {
    return async (dispatch) => {
        dispatch(authenticationSuccess(null, null, false));

        localStorage.removeItem("user");
        localStorage.removeItem("token");
        
        return successCB();
    }
}