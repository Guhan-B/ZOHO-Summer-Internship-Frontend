import axios from 'axios';
import { detectBrowser, detectOS } from "../Utils/meta";

export const login = async (data, onSuccess, onError) => {
    try {
        const body = {
            email: data.email,
            password: data.password,
            browser: detectBrowser(),
            OS: detectOS(),
        };

        const response = await axios.post("/authentication/login", body);
        
        document.cookie.split(";").forEach(cookie => {
            const [key, value] = cookie.split("=");
            if(key === "CSRF-TOKEN") {
                axios.defaults.headers["X-CSRF-Token"] = value;
            }
        });

        onSuccess("You have been successfully logged in", response.data.data.user);
    }
    catch(e) {
        const error = e?.response?.data?.error;

        if(error && error?.code === "VALIDATION_FAILED")
            return onError(error.message, error.errors);
    
        return onError("Unable to process request. Try again");
    }
}

export const register = async (data, onSuccess, onError) => {
    try {
        await axios.post("/authentication/register", {...data, bloodGroup: data.bloodGroup.value});        
        onSuccess("Register successfull. Continue to login");
    }
    catch(e) {
        const error = e?.response?.data?.error;
    
        if(error && error?.code === "VALIDATION_FAILED")
            return onError(error.message, error.errors);
        
        return onError("Unable to process request. Try again");
    }
}

export const reset = async (data, onSuccess, onError) => {
    try {
        const response = await axios.post(`/authentication/reset-password`, data);
        onSuccess(response.data.data.message);
    }
    catch(e) {
        const error = e?.response?.data?.error;
        
        if(error && error?.code === "VALIDATION_FAILED")
            return onError(error.message, error.errors);
            
        onError("Unable to process request. Try again") 
    }
}

export const logout = async (data, onSuccess, onError) => {
    try {
        const response = await axios.post("/authentication/logout", data);
        if(response.data.data.redirect)
            onSuccess(true, "You have been logged out successfully");
        else
            onSuccess(false, "Session(s) terminated successfully");
    }
    catch(e) {
        onError("Unable to process request. Try again");
    }
}

export const fetchUser = async (onSuccess, onError) => {
    try {
        const response  = await axios.get("/authentication/user");

        document.cookie.split(";").forEach(cookie => {
            const [key, value] = cookie.split("=");
            if(key === "CSRF-TOKEN") {
                axios.defaults.headers["X-CSRF-Token"] = value;
            }
        });

        onSuccess("User loaded successfully", response.data.data.user);
    }
    catch(e) {
        onError("Unable to process request. Try again");
    }
}

export const createTournament = async (data, onSuccess, onError) => {
    try {
        const response = await axios.post("/administrator/tournaments/create", data);
        onSuccess("Tournament created successfully", response.data.data.tournament);
    }
    catch(e) {
        const error = e?.response?.data?.error;
    
        if(error && error?.code === "VALIDATION_FAILED")
            return onError(error.message, error.errors);
            
        onError("Unable to process request. Try again");            
    }
}

export const fetchTournament = async (id, onSuccess, onError) => {
    try {
        const response = await axios.get(`/administrator/tournaments/${id}`);
        return onSuccess("Trounament loaded successfully", response.data.data.tournament);
    }
    catch(e) {
        return onError("Unable to process request. Try again");
    }
}

export const cancelTournament = async (id, onSuccess, onError) => {
    try {
        await axios.post(`/administrator/tournaments/cancel/${id}`);
        onSuccess("Tournament cancelled successfully");
    }
    catch(e) {
        onError("Unable to process request. Try again")
    }
}

export const editTournament = async (data, onSuccess, onError) => {
    try {
        await axios.post(`/administrator/tournaments/edit/${data.id}`, data);
        onSuccess("Tournament details updated successfully");
    }
    catch(e) {
        const error = e?.response?.data?.error;
        
        if(error && error?.code === "VALIDATION_FAILED")
            return onError(error.message, error.errors);
            
        onError("Unable to process request. Try again")
    }
}

export const fetchTournaments = async (onSuccess, onError) => {
    try {
        const response = await axios.get("/administrator/tournaments");
        onSuccess("Trounaments loaded successfully", response.data.data.tournaments);
    }
    catch(e) {
        onError("Unable to process request. Try again")
    }
}

export const updateResult = async (data, onSuccess, onError) => {
    try {
        const response = await axios.post("/administrator/team/result", data);   
        onSuccess("Result updated successfully", data.result);
    }
    catch(e) {
        const error = e?.response?.data?.error;
        
        if(error && error?.code === "VALIDATION_FAILED")
            return onError(error.message, error.errors);
            
        onError("Unable to process request. Try again")
    }
}

export const fetchAvaliableTournaments = async (onSuccess, onError) => {
    try {
        const response = await axios.get(`/participant/available/`);
        return onSuccess("Avaliable trounaments loaded successfully", response.data.data.tournaments);
    }
    catch(e) {
        onError("Unable to process request. Try again")
    }
}

export const fetchRegisteredTournaments = async (onSuccess, onError) => {
    try {
        const response = await axios.get("/participant/registered");
        onSuccess("Registered tournaments loaded successfully", response.data.data.tournaments);
    }
    catch(e) {
        onError("Unable to process request. Try again")
    }
}

export const editProfile = async (data, onSuccess, onError) => {
    try {
        await axios.post(`/participant/profile`, {...data, bloodGroup: data.bloodGroup.value});
        onSuccess("Profile has been updated successfully");
    }
    catch(e) {
        const error = e?.response?.data?.error;
        
        if(error && error?.code === "VALIDATION_FAILED")
            return onError(error.message, error.errors);
            
        onError("Unable to process request. Try again")
    }
}

export const applyTournament = async (data, onSuccess, onError) => {
    try {
        await axios.post("/participant/apply", data);
        onSuccess("Tournament applied successfully");
    }
    catch(e) {
        const error = e?.response?.data?.error;
        
        if(error && error?.code === "VALIDATION_FAILED")
            return onError(error.message, error.errors);

        onError("Unable to process request. Try again")
    }
}

export const withdraw = async (data, onSuccess, onError) => {
    try {
        await axios.post("/participant/withdraw", data);
        onSuccess("Withdrawed from tournament successfully");
    }
    catch(e) {
        const error = e?.response?.data?.error;
        
        if(error && error?.code === "VALIDATION_FAILED")
            return onError(error.message, error.errors);

        onError("Unable to process request. Try again")
    }
}

export const addAdministrators = async (data, onSuccess, onError) => {
    try {
        await axios.post("/administrator/add", data);
        onSuccess("Administrators created successfully");
    }
    catch(e) {
        const error = e?.response?.data?.error;
        
        if(error && error?.code === "VALIDATION_FAILED")
            return onError(error.message, error.errors);

        onError("Unable to process request. Try again")
    }
}

export const fetchSessions = async (onSuccess, onError) => {
    try {
        const response = await axios.get("/authentication/sessions");
        onSuccess("Session loaded successfully", response.data.data)
    }
    catch(e) {
        onError("Unable to process request. Try again")
    }
}