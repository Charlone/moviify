import {toast} from "react-toastify";

export function DataHandle(activeSlug, airingToday, loadMoviesData, loadSeriesData, movie, movieImages, nowPlaying, onTheAir, popularMovies, popularSeries, serie, serieImages, topMovies, topSeries, upcoming, viewRequested) {
    let categoryToCheck;

    if (viewRequested === 'movies') {
        switch (activeSlug) {
            case "popularMovies":categoryToCheck = popularMovies; break;
            case "topMovies": categoryToCheck = topMovies; break;
            case "upcoming": categoryToCheck = upcoming; break;
            case "movie": categoryToCheck = movie; break;
            case "movieImages": categoryToCheck = movieImages; break;
            case "nowPlaying": categoryToCheck = nowPlaying; break;
            default: return;
        }

        if (categoryToCheck.length === 0) {
            loadMoviesData(activeSlug)
                .catch(error => {
                    toast.error("Could not load movies: " + error, {
                        position: "top-right",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                    })
                })
        }
    } else {
        switch (activeSlug) {
            case "popularSeries": categoryToCheck = popularSeries; break;
            case "topSeries": categoryToCheck = topSeries; break;
            case "onTheAir": categoryToCheck = onTheAir; break;
            case "airingToday": categoryToCheck = airingToday; break;
            case "serieImages": categoryToCheck = serieImages; break;
            case "serie": categoryToCheck = serie; break;
            default: return;
        }

        if (categoryToCheck.length === 0) {
            loadSeriesData(activeSlug)
                .catch(error => {
                    toast.error("Could not load movies: " + error, {
                        position: "top-right",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                    })
                })
        }
    }
}

export function FetchAll(loadMoviesData, loadSeriesData, loadActorsData) {
    let dataCategories = [
        "popularMovies",
        "topMovies",
        "upcoming",
        "nowPlaying",
        "popularSeries",
        "topSeries",
        "onTheAir",
        "airingToday",
        "popularActors",
    ]

    dataCategories.forEach(category => {
        switch (category) {
            case "popularMovies":
            case "topMovies":
            case "upcoming":
            case "nowPlaying": loadMoviesData(category); break;
            case "popularSeries":
            case "topSeries":
            case "onTheAir":
            case "airingToday": loadSeriesData(category); break;
            case "popularActors": loadActorsData(category); break;
            default: return;
        }
    })

}