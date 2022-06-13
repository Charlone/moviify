import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function actorsReducer(state = initialState.actors, action) {
    switch (action.type) {
        case types.GET_POPULAR_ACTORS_SUCCESS:
            return Object.assign({}, state, {popularActors: action.popularActors.results});
        case types.GET_ACTOR_SUCCESS:
            return Object.assign({}, state, {actor: action.actor});
        case types.GET_ACTOR_IMAGES_SUCCESS:
            console.log(action)
            return Object.assign({}, state, {actorImages: action.actorImages.profiles});
        case types.GET_ACTOR_TRENDING_SUCCESS:
            return Object.assign({}, state, {trending: action.actorTrending.results});
        default:
            return state;
    }
}