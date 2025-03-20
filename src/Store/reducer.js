
export default function movieReducer(state = { movies: [], error: '', loading: false }, action) {
    switch (action.type) {
        case "FETCH_MOVIES":
            return { ...state, loading: true, error: '' };
        case SET_MOVIES:
            return { ...state, loading: false, movies: action.payload, error: '' };
        case SET_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}