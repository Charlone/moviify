const initialState = {
    viewRequested: 'movies',
    apiCallsInProgress: 0,
    movies: {
        latest: [],
        popular: [],
        top: [],
        upcoming: [],
        movie: [],
        images: []
    },
    headers: [
        {
            label: "popular",
            slug: "popular"
        },
        {
            label: "latest",
            slug: "latest"
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
