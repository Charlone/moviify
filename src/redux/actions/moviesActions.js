import * as types from './actionTypes';
import * as moviesApi from '../../api/moviesApi';
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadPopularMoviesSuccess(popularMovies) {
    return { type: types.GET_POPULAR_MOVIES_SUCCESS, popularMovies }
}

export function loadNowPlayingMoviesSuccess(nowPlayingMovies) {
    return { type: types.GET_NOW_PLAYING_MOVIES_SUCCESS, nowPlayingMovies }
}

export function loadTopMoviesSuccess(topMovies) {
    return { type: types.GET_TOP_MOVIES_SUCCESS, topMovies }
}

export function loadUpcomingMoviesSuccess(upcomingMovies) {
    return { type: types.GET_UPCOMING_MOVIES_SUCCESS, upcomingMovies }
}

export function loadRecommendedMoviesSuccess(recommendedMovies) {
    return { type: types.GET_RECOMMENDED_MOVIES_SUCCESS, recommendedMovies }
}

export function loadMoviesGenreSuccess(moviesGenre) {
    return { type: types.GET_MOVIES_GENRE_SUCCESS, moviesGenre }
}

export function loadMovieSuccess(movie) {
    return { type: types.GET_MOVIE_SUCCESS, movie }
}

export function loadMovieVideosSuccess(movieVideos) {
    return { type: types.GET_MOVIE_VIDEOS_SUCCESS, movieVideos }
}

export function loadMoviesData(type, movieId = null) {
    return async function(dispatch) {
        dispatch(beginApiCall());
        return await moviesApi
            .getMovies(type, movieId)
            .then((movieData) => {
                switch (type) {
                    case "nowPlaying": dispatch(loadNowPlayingMoviesSuccess(movieData)); break;
                    case "popularMovies": return dispatch(loadPopularMoviesSuccess(movieData));
                    case "topMovies": dispatch(loadTopMoviesSuccess(movieData)); break;
                    case "upcoming": dispatch(loadUpcomingMoviesSuccess(movieData)); break;
                    case "genre": dispatch(loadMoviesGenreSuccess(movieData)); break;
                    case "recommended": dispatch(loadRecommendedMoviesSuccess(movieData, movieId)); break;
                    case "movie": dispatch(loadMovieSuccess(movieData, movieId)); break;
                    case "movieVideos": dispatch(loadMovieVideosSuccess(movieData, movieId)); break;
                    default: return;
                }
            })
            .catch(error => {
                dispatch(apiCallError(error));
                throw error;
            });
    };
}