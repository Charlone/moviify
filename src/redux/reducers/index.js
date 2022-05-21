import { combineReducers } from "redux";
import apiCallsInProgress from "./apiStatusReducer"
import viewRequested from "./viewRequestedReducer";
import movies from "./moviesReducer";

const rootReducer = combineReducers({
    apiCallsInProgress,
    viewRequested,
    movies,
});

export default rootReducer;
