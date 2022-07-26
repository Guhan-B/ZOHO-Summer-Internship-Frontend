import axios from 'axios';

export const login = async (data, onSuccess, onError) => {
    try {
        const body = {
            email: data.email,
            password: data.password,
        };

        const response = await axios.post("http://localhost:8000/authentication/login", body);
        onSuccess("Login successfull", response.data.data.user);
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
        await axios.post("http://localhost:8000/authentication/register", {...data, bloodGroup: data.bloodGroup.value});        
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
        await axios.post(`http://localhost:8000/authentication/reset-password`, data);
        onSuccess("Password changed successfully");
    }
    catch(e) {
        const error = e?.response?.data?.error;
        
        if(error && error?.code === "VALIDATION_FAILED")
            return onError(error.message, error.errors);
            
        onError("Unable to process request. Try again") 
    }
}

export const logout = async (onSuccess, onError) => {
    try {
        await axios.get("http://localhost:8000/authentication/logout");
        onSuccess("Logout successfull");
    }
    catch(e) {
        onError("Unable to process request. Try again");
    }
}

export const fetchUser = async (onSuccess, onError) => {
    try {
        const response  = await axios.get("http://localhost:8000/authentication/user");
        onSuccess("User loaded successfully", response.data.data.user);
    }
    catch(e) {
        onError("Unable to process request. Try again");
    }
}

export const createTournament = async (data, onSuccess, onError) => {
    try {
        const response = await axios.post("http://localhost:8000/administrator/tournaments/create", data);
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
        const response = await axios.get(`http://localhost:8000/administrator/tournaments/${id}`);
        return onSuccess("Trounament loaded successfully", response.data.data.tournament);
    }
    catch(e) {
        return onError("Unable to process request. Try again");
    }
}

export const cancelTournament = async (id, onSuccess, onError) => {
    try {
        await axios.post(`http://localhost:8000/administrator/tournaments/cancel/${id}`);
        onSuccess("Tournament cancelled successfully");
    }
    catch(e) {
        onError("Unable to process request. Try again")
    }
}

export const editTournament = async (data, onSuccess, onError) => {
    try {
        await axios.post(`http://localhost:8000/administrator/tournaments/edit/${data.id}`, data);
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
        const response = await axios.get("http://localhost:8000/administrator/tournaments");
        onSuccess("Trounaments loaded successfully", response.data.data.tournaments);
    }
    catch(e) {
        onError("Unable to process request. Try again")
    }
}

export const updateResult = async (data, onSuccess, onError) => {
    try {
        const response = await axios.post("http://localhost:8000/administrator/team/result", data);   
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
        const response = await axios.post(`http://localhost:8000/participant/available/`, { today: new Date().toGMTString() });
        return onSuccess("Avaliable trounaments loaded successfully", response.data.data.tournaments);
    }
    catch(e) {
        onError("Unable to process request. Try again")
    }
}

export const fetchRegisteredTournaments = async (onSuccess, onError) => {
    try {
        const response = await axios.get("http://localhost:8000/participant/registered");
        onSuccess("Registered tournaments loaded successfully", response.data.data.tournaments);
    }
    catch(e) {
        onError("Unable to process request. Try again")
    }
}

export const editProfile = async (data, onSuccess, onError) => {
    try {
        await axios.post(`http://localhost:8000/participant/profile`, {...data, bloodGroup: data.bloodGroup.value});
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
        await axios.post("http://localhost:8000/participant/apply", data);
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
        await axios.post("http://localhost:8000/participant/withdraw", data);
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
        await axios.post("http://localhost:8000/administrator/add", data);
        onSuccess("Administrators created successfully");
    }
    catch(e) {
        const error = e?.response?.data?.error;
        
        if(error && error?.code === "VALIDATION_FAILED")
            return onError(error.message, error.errors);

        onError("Unable to process request. Try again")
    }
}