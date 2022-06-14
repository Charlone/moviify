import * as types from './actionTypes';
import * as searchAoi from '../../api/searchApi';
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadSearchMovie(movie) {
    return { type: types.GET_SEARCH_RESULTS_MOVIE, movie }
}

export function loadSearchSeries(series) {
    return { type: types.GET_SEARCH_RESULTS_SERIES, series }
}
export function loadSearchActor(actor) {
    return { type: types.GET_SEARCH_RESULTS_ACTOR, actor }
}

export function loadSearchData(type, query) {
    return async function(dispatch) {
        dispatch(beginApiCall());
        return await searchAoi
            .getSearchResults(type, query)
            .then((searchData) => {
                switch (type) {
                    case "movie": dispatch(loadSearchMovie(searchData)); break;
                    case "series": return dispatch(loadSearchSeries(searchData));
                    case "actor": dispatch(loadSearchActor(searchData)); break;
                    default: return;
                }
            })
            .catch(error => {
                dispatch(apiCallError(error));
                throw error;
            });
    };
}