import {toast} from "react-toastify";
import {SplideSlide} from "@splidejs/react-splide";
import YoutubeEmbed from "./YoutubeEmbed";

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

export const sliderOptions = {
    rewind: true,
    gap: "1rem",
    type: 'slider',
    arrows: 'slider',
    autoplay: false,
    start: 0,
    drag: true,
    pagination: false,
    perPage: 3,
    perMove: 1,
    updateOnMove: true,
    fixedWidth: "33.33%",
    height: "auto"
}

export const Genres = ({genres}) => {
    let genresToDisplay = [];

    if (genres.length > 0) {
        genres.forEach(genre => {
            genresToDisplay.push(
                <div key={genre.id} className={"genre"}>{genre.name}</div>
            );
        });
    }

    return genresToDisplay;
}

export const getDuration = (int) => {
    let digit = Number(int);

    const hour = Math.floor(digit / 60),
        min = Math.floor((int - (hour * 60)));

    const hourDisplay = hour > 0 ? `${hour}h ` : '',
        minDisplay = min > 0 ? `${min}m` : '';

    return (hourDisplay + minDisplay) === '' ? 'TBA' : hourDisplay + minDisplay;
}

export const dateFormatter = (date) => {
    const dateToFormat = new Date(date),
        options = { year: 'numeric', month: 'short', day: 'numeric' };

    return dateToFormat.toLocaleDateString("en-US", options) === 'Invalid Date' ? 'TBA' : dateToFormat.toLocaleDateString("en-US", options);
}

export const MoreVideosSlider = ({moreVideos}) => {
    let videosArray = [];

    moreVideos.forEach(video => {
        videosArray.push(
            <SplideSlide key={video.key}>
                <div className={"more-videos-vid"}>
                    <YoutubeEmbed embedId={video.key} />
                </div>
            </SplideSlide>
        )
    });

    if (videosArray.length > 5) {
        return videosArray.slice(1, 6);
    }

    return videosArray;
}