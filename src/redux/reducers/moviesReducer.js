import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function moviesReducer(state = initialState.movies, action) {
    switch (action.type) {
        case types.GET_POPULAR_MOVIES_SUCCESS:
            return action.popularMovies;
        case types.GET_LATEST_MOVIES_SUCCESS:
            return action.latestMovies;
        case types.GET_TOP_MOVIES_SUCCESS:
            return action.topMovies;
        case types.GET_UPCOMING_MOVIES_SUCCESS:
            return action.upcomingMovies;
        case types.GET_MOVIE_SUCCESS:
            return action.movie;
        case types.GET_MOVIE_IMAGES_SUCCESS:
            return action.movieImage;
        default:
            return state;
    }
}