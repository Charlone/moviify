import { handleResponse, handleError} from "./apiUtils";
import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

export const getActors = async (type, actorId = null) => {
    const language = 'en-US';
    let path;

    switch (type) {
        case "popularActors": path = '/person/popular'; break;
        case "actor": path = `/person/${actorId}`; break;
        case "actorImages": path = `/person/${actorId}/images`; break;
        case "trending": path = `/trending/person/week`; break;
        default: return handleError("No registered endpoint for specified type - " + type);
    }

    return await axios.get(baseUrl + path + '?api_key=' + apiKey + '&language=' + language)
        .then(handleResponse)
        .catch(handleError);
}

