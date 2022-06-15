import { handleResponse, handleError} from "./apiUtils";
import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

export const getSearchResults = async (type, query) => {
    const language = 'en-US';
    let path;

    switch (type) {
        case "movie": path = '/search/movie'; break;
        case "serie": path = '/search/tv'; break;
        case "actor": path = '/search/person'; break;
        default: return handleError("No registered endpoint for specified type - " + type);
    }

    return await axios.get(baseUrl + path + '?api_key=' + apiKey + '&language=' + language + '&query=' + query + '&include_adult=false')
        .then(handleResponse)
        .catch(handleError);
}