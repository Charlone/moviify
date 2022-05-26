import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function viewRequestedReducer(state = initialState.activeSlug, action) {
    switch (action.type) {
        case types.GET_ACTIVE_SLUG_SUCCESS:
            return action.activeSlug
        default:
            return state;
    }
}