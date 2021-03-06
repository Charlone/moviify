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
        case types.GET_SERIE_SUCCESS:
            return Object.assign({}, state, {serie: action.serie});
        case types.GET_SERIES_RECOMMENDED_SUCCESS:
            return Object.assign({}, state, {seriesRecommended: action.seriesRecommended.results});
        case types.GET_SERIE_VIDEOS_SUCCESS:
            return Object.assign({}, state, {serieVideos: action.serieVideos.results});
        default:
            return state;
    }
}