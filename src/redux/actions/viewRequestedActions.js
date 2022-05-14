import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function viewRequestedSuccess(viewRequested) {
    return { type: types.VIEW_REQUESTED_SUCCESS, viewRequested}
}

export function viewRequestDispatcher(dispatch, viewRequested) {
    dispatch(viewRequestedSuccess(viewRequested));
}

export function viewRequested(viewRequested) {
    return function (dispatch) {
        dispatch(beginApiCall());
        return viewRequestDispatcher(dispatch, viewRequested)
            .catch(error => {
                dispatch(apiCallError(error));
                throw error;
            });
    }
}