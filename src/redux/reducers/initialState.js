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
    headers: [
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
    ]
};

export default initialState;
