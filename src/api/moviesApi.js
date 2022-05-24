import { handleResponse, handleError} from "./apiUtils";
import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

export const getMovies = async (type, movieId = null) => {
    const language = 'en-US';
    let path;

    switch (type) {
        case "nowPlaying": path = '/movie/now_playing'; break;
        case "popular": path = '/movie/popular'; break;
        case "top": path = '/movie/top_rated'; break;
        case "upcoming": path = '/movie/upcoming'; break;
        case "genre": path = '/genre/movie/list'; break;
        case "recommended": path = `/movie/${movieId}/recommendations`; break;
        case "movie": path = `/movie/${movieId}`; break;
        case "images": path = `/movie/${movieId}/images`; break;
        default: return handleError("No registered endpoint for specified type - " + type);
    }

    return await axios.get(baseUrl + path + '?api_key=' + apiKey + '&language=' + language)
        .then(handleResponse)
        .catch(handleError);
}

