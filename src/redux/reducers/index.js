import { combineReducers } from "redux";
import apiCallsInProgress from "./apiStatusReducer"
import viewRequested from "./viewRequestedReducer";
import moviesReducer from "./moviesReducer";

const rootReducer = combineReducers({
    apiCallsInProgress,
    viewRequested,
    moviesReducer,
});

export default rootReducer;
