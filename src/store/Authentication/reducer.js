import { 
    AUTHENTICATION_REQUEST,
    AUTHENTICATION_SUCCESS,
    AUTHENTICATION_ERROR,
} from "./type";

const initialState = {
    token: null,
    user: null,
    status: false,
    loading: false,
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case AUTHENTICATION_REQUEST:
            return {
                ...state,
                loading: true
            };
        
        case AUTHENTICATION_SUCCESS:
            return {
                ...state,
                token: action.token,
                status: action.status,
                user: action.user,
                loading: false,
            };
        
        case AUTHENTICATION_ERROR:
            return {
                ...state,
                loading: false,
            }
                    
        default:
            return state;
    }
}

export default reducer;