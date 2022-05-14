import { combineReducers } from "redux";
import apiCallsInProgress from "./apiStatusReducer"
import viewRequested from "./viewRequestedReducer";

const rootReducer = combineReducers({
    apiCallsInProgress,
    viewRequested
});

export default rootReducer;
