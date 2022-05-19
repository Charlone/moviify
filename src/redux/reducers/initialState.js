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
    }
};

export default initialState;
