import { SplideSlide } from "@splidejs/react-splide";
import YoutubeEmbed from "./YoutubeEmbed";

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

    if (typeof genres === 'object') {
        if (genres.length > 0) {
            genres.forEach(genre => {
                genresToDisplay.push(
                    <div key={genre.id} className={"genre"}>{genre.name}</div>
                );
            });
        }
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
        return videosArray.slice(1, 8);
    }

    return videosArray;
}