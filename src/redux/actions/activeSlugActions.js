import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function activeSlugSuccess(activeSlug) {
    return { type: types.GET_ACTIVE_SLUG_SUCCESS, activeSlug}
}

export function loadActiveSlug(activeSlug) {
    return function (dispatch) {
        dispatch(beginApiCall());
        try {
            return dispatch(activeSlugSuccess(activeSlug));
        } catch (error) {
            dispatch(apiCallError(error));
            throw error;
        }
    }
}