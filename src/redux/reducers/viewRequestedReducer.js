import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function viewRequestedReducer(state = initialState.viewRequested, action) {
    switch (action.type) {
        case types.VIEW_REQUESTED_SUCCESS:
            return action.viewRequested
        default:
            return state;
    }
}