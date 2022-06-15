import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function actorsReducer(state = initialState.search, action) {
    switch (action.type) {
        case types.GET_SEARCH_RESULTS_MOVIE:
            return Object.assign({}, state, {movie: action.movie.results});
        case types.GET_SEARCH_RESULTS_SERIES:
            return Object.assign({}, state, {serie: action.serie.results});
        case types.GET_SEARCH_RESULTS_ACTOR:
            return Object.assign({}, state, {actor: action.actor.results});
        default:
            return state;
    }
}