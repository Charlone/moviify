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

export function loadSerieSuccess(serie) {
    return { type: types.GET_SERIE_SUCCESS, serie }
}

export function loadSeriesRecommendedSuccess(seriesRecommended) {
    return { type: types.GET_SERIES_RECOMMENDED_SUCCESS, seriesRecommended }
}

export function loadSerieVideosSuccess(serieVideos) {
    return { type: types.GET_SERIE_VIDEOS_SUCCESS, serieVideos }
}

export function loadSeriesData(type, serieId = null, page) {
    return async function(dispatch) {
        dispatch(beginApiCall());
        return await seriesApi
            .getSeries(type, serieId, page)
            .then((serieData) => {
                switch (type) {
                    case "airingToday": dispatch(loadAiringTodaySeriesSuccess(serieData)); break;
                    case "popularSeries": return dispatch(loadPopularSeriesSuccess(serieData));
                    case "topSeries": dispatch(loadTopSeriesSuccess(serieData)); break;
                    case "onTheAir": dispatch(loadOnTheAirSeriesSuccess(serieData)); break;
                    case "serie": dispatch(loadSerieSuccess(serieData, serieId)); break;
                    case "seriesRecommended": dispatch(loadSeriesRecommendedSuccess(serieData, serieId)); break;
                    case "serieVideos": dispatch(loadSerieVideosSuccess(serieData, serieId)); break;
                    default: return;
                }
            })
            .catch(error => {
                dispatch(apiCallError(error));
                throw error;
            });
    };
}