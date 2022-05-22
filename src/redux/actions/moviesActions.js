import * as types from './actionTypes';
import * as moviesApi from '../../api/moviesApi';
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadPopularMoviesSuccess(popularMovies) {
    return { type: types.GET_POPULAR_MOVIES_SUCCESS, popularMovies }
}
export function loadLatestMoviesSuccess(latestMovies) {
    return { type: types.GET_LATEST_MOVIES_SUCCESS, latestMovies }
}
export function loadTopMoviesSuccess(topMovies) {
    return { type: types.GET_TOP_MOVIES_SUCCESS, topMovies }
}
export function loadUpcomingMoviesSuccess(upcomingMovies) {
    return { type: types.GET_UPCOMING_MOVIES_SUCCESS, upcomingMovies }
}
export function loadMovieSuccess(movie) {
    return { type: types.GET_MOVIE_SUCCESS, movie }
}

export function loadMovieImagesSuccess(movieImage) {
    return { type: types.GET_MOVIE_IMAGES_SUCCESS, movieImage }
}

export function loadMoviesData(type, movieId = null) {
    return async function(dispatch) {
        dispatch(beginApiCall());
        return await moviesApi
            .getMovies(type, movieId)
            .then((movieData) => {
                switch (type) {
                    case "latest": dispatch(loadLatestMoviesSuccess(movieData)); break;
                    case "popular": return dispatch(loadPopularMoviesSuccess(movieData));
                    case "top": dispatch(loadTopMoviesSuccess(movieData)); break;
                    case "upcoming": dispatch(loadUpcomingMoviesSuccess(movieData)); break;
                    case "movie": dispatch(loadMovieSuccess(movieData, movieId)); break;
                    case "images": dispatch(loadMovieImagesSuccess(movieData, movieId)); break;
                    default: return;
                }
            })
            .catch(error => {
                dispatch(apiCallError(error));
                throw error;
            });
    };
}