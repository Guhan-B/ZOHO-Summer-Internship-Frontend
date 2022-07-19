import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import authenticationReducer from "./Authentication/reducer";

const reducer = combineReducers({
    authentication: authenticationReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;