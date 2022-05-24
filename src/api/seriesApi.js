import { handleResponse, handleError} from "./apiUtils";
import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

export const getSeries = async (type, serieId = null) => {
    const language = 'en-US';
    let path;

    switch (type) {
        case "onTheAir": path = '/tv/on_the_air'; break;
        case "popular": path = '/tv/popular'; break;
        case "top": path = '/tv/top_rated'; break;
        case "airingToday": path = '/tv/airing_today'; break;
        case "recommended": path = `/tv/${serieId}/recommendations`; break;
        case "similar": path = `/tv/${serieId}/similar`; break;
        case "serie": path = `/tv/${serieId}`; break;
        case "images": path = `/tv/${serieId}/images`; break;
        default: return handleError("No registered endpoint for specified type - " + type);
    }

    return await axios.get(baseUrl + path + '?api_key=' + apiKey + '&language=' + language)
        .then(handleResponse)
        .catch(handleError);
}