import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function viewRequestedSuccess(viewRequested) {
    return { type: types.VIEW_REQUESTED_SUCCESS, viewRequested}
}

export function loadViewRequested(viewRequested) {
    return function (dispatch) {
        dispatch(beginApiCall());
        try {
            dispatch(viewRequestedSuccess(viewRequested));
        } catch (error) {
            dispatch(apiCallError(error));
            throw error;
        }
    }
}