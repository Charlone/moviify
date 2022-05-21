import * as types from './actionTypes';
import * as moviesApi from '../../api/moviesApi';
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadPopularMoviesSuccess(popularMovies) {
    return { types: types.GET_POPULAR_MOVIES_SUCCESS, popularMovies }
}
export function loadLatestMoviesSuccess(latestMovies) {
    return { types: types.GET_LATEST_MOVIES_SUCCESS, latestMovies }
}
export function loadTopMoviesSuccess(topMovies) {
    return { types: types.GET_TOP_MOVIES_SUCCESS, topMovies }
}
export function loadUpcomingMoviesSuccess(upcomingMovies) {
    return { types: types.GET_UPCOMING_MOVIES_SUCCESS, upcomingMovies }
}
export function loadMovieSuccess(movie) {
    return { types: types.GET_MOVIE_SUCCESS, movie }
}

export function loadMovieImagesSuccess(movieImage) {
    return { types: types.GET_MOVIE_IMAGES_SUCCESS, movieImage }
}

export function loadMoviesData(type, movieId = null) {
    return function(dispatch) {
        dispatch(beginApiCall());
        return moviesApi
            .getMovies(type, movieId)
            .then(movieData => {
                switch (type) {
                    case "latest": dispatch(loadLatestMoviesSuccess(movieData)); break;
                    case "popular": dispatch(loadPopularMoviesSuccess(movieData)); break;
                    case "top": dispatch(loadTopMoviesSuccess(movieData)); break;
                    case "upcoming": dispatch(loadUpcomingMoviesSuccess(movieData)); break;
                    case "movie": dispatch(loadMovieSuccess(movieData)); break;
                    case "images": dispatch(loadMovieImagesSuccess(movieData)); break;
                }
            })
            .catch(error => {
                dispatch(apiCallError(error));
                throw error;
            });
    };
}