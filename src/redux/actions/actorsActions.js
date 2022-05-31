import * as types from './actionTypes';
import * as actorApi from '../../api/actorsApi';
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadPopularActorsSuccess(popularActors) {
    return { type: types.GET_POPULAR_ACTORS_SUCCESS, popularActors }
}

export function loadActorSuccess(actor) {
    return { type: types.GET_ACTOR_SUCCESS, actor }
}

export function loadActorImagesSuccess(actorImage) {
    return { type: types.GET_ACTOR_IMAGES_SUCCESS, actorImage }
}

export function loadActorsData(type, actorId = null) {
    return async function(dispatch) {
        dispatch(beginApiCall());
        return await actorApi
            .getActors(type, actorId)
            .then((actorData) => {
                switch (type) {
                    case "popularActors": return dispatch(loadPopularActorsSuccess(actorData));
                    case "actor": dispatch(loadActorSuccess(actorData, actorId)); break;
                    case "actorImages": dispatch(loadActorImagesSuccess(actorData, actorId)); break;
                    default: return;
                }
            })
            .catch(error => {
                dispatch(apiCallError(error));
                throw error;
            });
    };
}