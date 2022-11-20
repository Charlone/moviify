import { handleResponse, handleError} from "./apiUtils";
import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

export const getMovies = async (type, movieId = null, page = null) => {
    const language = 'en-US';
    let path;
    if (page === null) {
        page = 1
    }

    switch (type) {
        case "nowPlaying": path = '/movie/now_playing'; break;
        case "popularMovies": path = '/movie/popular'; break;
        case "topMovies": path = '/movie/top_rated'; break;
        case "upcoming": path = '/movie/upcoming'; break;
        case "recommended": path = `/movie/${movieId}/recommendations`; break;
        case "movie": path = `/movie/${movieId}`; break;
        case "movieVideos": path = `/movie/${movieId}/videos`; break;
        default: return handleError("No registered endpoint for specified type - " + type);
    }

    return await axios.get(baseUrl + path + '?api_key=' + apiKey + '&language=' + language + '&page=' + page)
        .then(handleResponse)
        .catch(handleError);
}

