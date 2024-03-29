import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function moviesReducer(state = initialState.movies, action) {
    switch (action.type) {
        case types.GET_POPULAR_MOVIES_SUCCESS:
            return Object.assign({}, state, {popularMovies: action.popularMovies.results, totalPages: action.popularMovies.total_pages});
        case types.GET_NOW_PLAYING_MOVIES_SUCCESS:
            return Object.assign({}, state, {nowPlaying: action.nowPlayingMovies.results, totalPages: action.nowPlayingMovies.total_pages});
        case types.GET_TOP_MOVIES_SUCCESS:
            return Object.assign({}, state, {topMovies: action.topMovies.results, totalPages: action.topMovies.total_pages});
        case types.GET_UPCOMING_MOVIES_SUCCESS:
            return Object.assign({}, state, {upcoming: action.upcomingMovies.results, totalPages: action.upcomingMovies.total_pages});
        case types.GET_RECOMMENDED_MOVIES_SUCCESS:
            return Object.assign({}, state, {recommended: action.recommendedMovies.results});
        case types.GET_MOVIE_SUCCESS:
            return Object.assign({}, state, {movie: action.movie});
        case types.GET_MOVIE_VIDEOS_SUCCESS:
            return Object.assign({}, state, {movieVideos: action.movieVideos.results})
        default:
            return state;
    }
}