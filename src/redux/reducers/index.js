import { combineReducers } from "redux";
import apiCallsInProgress from "./apiStatusReducer"
import viewRequested from "./viewRequestedReducer";
import movies from "./moviesReducer";
import series from "./seriesReducer";

const rootReducer = combineReducers({
    apiCallsInProgress,
    viewRequested,
    movies,
    series,
});

export default rootReducer;
