import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function seriesReducer(state = initialState.series, action) {
    switch (action.type) {
        case types.GET_POPULAR_SERIES_SUCCESS:
            return Object.assign({}, state, {popularSeries: action.popularSeries.results});
        case types.GET_ON_THE_AIR_SERIES_SUCCESS:
            return Object.assign({}, state, {onTheAir: action.onTheAirSeries.results});
        case types.GET_TOP_SERIES_SUCCESS:
            return Object.assign({}, state, {topSeries: action.topSeries.results});
        case types.GET_AIRING_TODAY_SERIES_SUCCESS:
            return Object.assign({}, state, {airingToday: action.airingTodaySeries.results});
        case types.GET_RECOMMENDED_SERIES_SUCCESS:
            return Object.assign({}, state, {recommended: action.recommendedSeries.results});
        case types.GET_SIMILAR_SERIES_SUCCESS:
            return Object.assign({}, state, {similar: action.similarSeries.results});
        case types.GET_MOVIE_SUCCESS:
            return Object.assign({}, state, {serie: action.serie.results});
        case types.GET_MOVIE_IMAGES_SUCCESS:
            return Object.assign({}, state, {seriesImages: action.serieImage.results});
        default:
            return state;
    }
}