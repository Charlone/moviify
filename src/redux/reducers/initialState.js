const initialState = {
    activeSlug: 'popular',
    viewRequested: 'movies',
    apiCallsInProgress: 0,
    movies: {
        nowPlaying: [],
        popular: [],
        top: [],
        upcoming: [],
        recommended: [],
        movie: [],
        images: []
    },
    series: {
        popular: [],
        top: [],
        onTheAir: [],
        airingToday: [],
        recommended: [],
        similar: [],
        serie: [],
        images: []
    },
    headers: {
        movies: [
            {
                label: "Popular",
                slug: "popular",
                icon: "star.svg"
            },
            {
                label: "Top Rated",
                slug: "top",
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
                slug: "popular",
                icon: "star.svg"
            },
            {
                label: "Top Rated",
                slug: "top",
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
