import { combineReducers } from "redux";
import apiCallsInProgress from "./apiStatusReducer";
import activeSlug from "./activeSlugReducer";
import viewRequested from "./viewRequestedReducer";
import movies from "./moviesReducer";
import series from "./seriesReducer";
import actors from "./actorsReducer";

const rootReducer = combineReducers({
    apiCallsInProgress,
    activeSlug,
    viewRequested,
    movies,
    series,
    actors,
});

export default rootReducer;
