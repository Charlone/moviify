const initialState = {
    activeSlug: 'popularMovies',
    viewRequested: 'movies',
    apiCallsInProgress: 0,
    movies: {
        nowPlaying: [],
        popularMovies: [],
        topMovies: [],
        upcoming: [],
        recommended: [],
        movie: [],
        movieImages: []
    },
    series: {
        popularSeries: [],
        topSeries: [],
        onTheAir: [],
        airingToday: [],
        recommended: [],
        similar: [],
        serie: [],
        serieImages: []
    },
    headers: {
        movies: [
            {
                label: "Popular",
                slug: "popularMovies",
                icon: "star.svg"
            },
            {
                label: "Top Rated",
                slug: "topMovies",
                icon: "trophy.svg"
            },
            {
                label: "Now Playing",
                slug: "nowPlaying",
                icon: "play.svg"
            },
            {
                label: "Upcoming",
                slug: "upcoming",
                icon: "movie.svg"
            },
            {
                label: "Actors",
                slug: "actors",
                icon: "actors.svg",
                href: "/actors"
            },
            {
                label: "Movies",
                slug: "movies",
                icon: "movie.svg",
                href: "/"
            },
            {
                label: "Series",
                slug: "series",
                icon: "monitor.svg",
                href: "/"
            }
        ],
        series: [
            {
                label: "Popular",
                slug: "popularSeries",
                icon: "star.svg"
            },
            {
                label: "Top Rated",
                slug: "topSeries",
                icon: "trophy.svg"
            },
            {
                label: "On The Air",
                slug: "onTheAir",
                icon: "film.svg"
            },
            {
                label: "Airing Today",
                slug: "airingToday",
                icon: "monitor.svg"
            },
            {
                label: "Actors",
                slug: "actors",
                icon: "actors.svg",
                href: "/actors"
            },
            {
                label: "Movies",
                slug: "movies",
                icon: "movie.svg",
                href: "/"
            },
            {
                label: "Series",
                slug: "series",
                icon: "monitor.svg",
                href: "/"
            }
        ]
    }
};

export default initialState;
