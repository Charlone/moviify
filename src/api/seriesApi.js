import { handleResponse, handleError} from "./apiUtils";
import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

export const getSeries = async (type, serieId = null, page = null) => {
    const language = 'en-US';
    let path;
    if (page === null) {
        page = 1
    }

    switch (type) {
        case "onTheAir": path = '/tv/on_the_air'; break;
        case "popularSeries": path = '/tv/popular'; break;
        case "topSeries": path = '/tv/top_rated'; break;
        case "airingToday": path = '/tv/airing_today'; break;
        case "serie": path = `/tv/${serieId}`; break;
        case "seriesRecommended": path = `/tv/${serieId}/recommendations`; break;
        case "serieVideos": path = `/tv/${serieId}/videos`; break;
        default: return handleError("No registered endpoint for specified type - " + type);
    }

    return await axios.get(baseUrl + path + '?api_key=' + apiKey + '&language=' + language + '&page=' + page)
        .then(handleResponse)
        .catch(handleError);
}