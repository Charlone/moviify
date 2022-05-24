import * as types from './actionTypes';
import * as seriesApi from '../../api/seriesApi';
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadPopularSeriesSuccess(popularSeries) {
    return { type: types.GET_POPULAR_SERIES_SUCCESS, popularSeries }
}

export function loadOnTheAirSeriesSuccess(onTheAirSeries) {
    return { type: types.GET_ON_THE_AIR_SERIES_SUCCESS, onTheAirSeries }
}

export function loadTopSeriesSuccess(topSeries) {
    return { type: types.GET_TOP_SERIES_SUCCESS, topSeries }
}

export function loadAiringTodaySeriesSuccess(airingTodaySeries) {
    return { type: types.GET_AIRING_TODAY_SERIES_SUCCESS, airingTodaySeries }
}

export function loadRecommendedSeriesSuccess(recommendedSeries) {
    return { type: types.GET_RECOMMENDED_SERIES_SUCCESS, recommendedSeries }
}

export function loadSimilarSeriesSuccess(similarSeries) {
    return { type: types.GET_SIMILAR_SERIES_SUCCESS, similarSeries }
}

export function loadSerieSuccess(serie) {
    return { type: types.GET_SERIE_SUCCESS, serie }
}

export function loadSerieImagesSuccess(serieImage) {
    return { type: types.GET_SERIE_IMAGES_SUCCESS, serieImage }
}

export function loadSeriesData(type, serieId = null) {
    return async function(dispatch) {
        dispatch(beginApiCall());
        return await seriesApi
            .getSeries(type, serieId)
            .then((serieData) => {
                switch (type) {
                    case "airingToday": dispatch(loadAiringTodaySeriesSuccess(serieData)); break;
                    case "popular": return dispatch(loadPopularSeriesSuccess(serieData));
                    case "top": dispatch(loadTopSeriesSuccess(serieData)); break;
                    case "onTheAir": dispatch(loadOnTheAirSeriesSuccess(serieData)); break;
                    case "recommended": dispatch(loadRecommendedSeriesSuccess(serieData)); break;
                    case "similar": dispatch(loadSimilarSeriesSuccess(serieData)); break;
                    case "movie": dispatch(loadSerieSuccess(serieData, serieId)); break;
                    case "images": dispatch(loadSerieImagesSuccess(serieData, serieId)); break;
                    default: return;
                }
            })
            .catch(error => {
                dispatch(apiCallError(error));
                throw error;
            });
    };
}