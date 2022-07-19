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
            return onError("One or more fields is invalid", error.errors);

        if(error && error?.code === "EMAIL_NOT_REGISTERED")
            return onError("Email is not registered", { email: true });
        
        if(error && error?.code === "WRONG_PASSWORD")
            return onError("Password entered is incorrect", { password: true });
    
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
            return onError("One or more fields is invalid", error.errors);

        if(error && error?.code === "EMAIL_ALREADY_REGISTERED")
            return onError("Email is already registered", { email: true });
        
        return onError("Unable to process request. Try again");
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
            return onError("One or more fields is invalid", error.errors);
            
        onError("Error occured. Unable to create tournament");            
    }
}

export const fetchTournament = async (id, onSuccess, onError) => {
    try {
        const response = await axios.get(`http://localhost:8000/administrator/tournaments/${id}`);
        return onSuccess("Trounament loaded successfully", response.data.data.tournament);
    }
    catch(e) {
        return onError("Error occured. Unable to load tournament");
    }
}

export const cancelTournament = async (id, onSuccess, onError) => {
    try {
        await axios.post(`http://localhost:8000/administrator/tournaments/cancel/${id}`);
        onSuccess("Tournament cancelled successfully");
    }
    catch(e) {
        onError("Unable to cancel tournament. Try again")
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
            return onError("One or more fields is invalid.", error.errors);
            
        onError("Error occured. Unable to edit tournament.")
    }
}

export const fetchTournaments = async (onSuccess, onError) => {
    try {
        const response = await axios.get("http://localhost:8000/administrator/tournaments");
        onSuccess("Trounaments loaded successfully", response.data.data.tournaments);
    }
    catch(e) {
        onError("Unable to load tournaments");
    }
}

export const fetchUser = async (onSuccess, onError) => {
    try {
        const response  = await axios.get("http://localhost:8000/authentication/user");
        onSuccess("User loaded successfully", response.data.data.user);
    }
    catch(e) {
        onError("Unable to load user");
    }
}
