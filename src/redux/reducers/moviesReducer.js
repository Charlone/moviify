import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function moviesReducer(state = initialState.movies, action) {
    switch (action.type) {
        case types.GET_POPULAR_MOVIES_SUCCESS:
            return Object.assign({}, state, {popular: action.popularMovies.results});
        case types.GET_LATEST_MOVIES_SUCCESS:
            return Object.assign({}, state, {latest: action.latestMovies.results});
        case types.GET_TOP_MOVIES_SUCCESS:
            return Object.assign({}, state, {top: action.topMovies.results});
        case types.GET_UPCOMING_MOVIES_SUCCESS:
            return Object.assign({}, state, {upcoming: action.upcomingMovies.results});
        case types.GET_MOVIE_SUCCESS:
            return Object.assign({}, state, {movie: action.movie.results});
        case types.GET_MOVIE_IMAGES_SUCCESS:
            return Object.assign({}, state, {images: action.movieImage.results});
        default:
            return state;
    }
}