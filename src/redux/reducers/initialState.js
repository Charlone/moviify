const initialState = {
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
                label: "popular",
                slug: "popular"
            },
            {
                label: "now playing",
                slug: "nowPlaying"
            },
            {
                label: "top rated",
                slug: "top"
            },
            {
                label: "upcoming",
                slug: "upcoming"
            }
        ],
        series: [
            {
                label: "popular",
                slug: "popular"
            },
            {
                label: "on the air",
                slug: "onTheAir"
            },
            {
                label: "top rated",
                slug: "top"
            },
            {
                label: "airing today",
                slug: "airingToday"
            },
        ]
    }
};

export default initialState;
