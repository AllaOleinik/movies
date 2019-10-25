import * as actionTypes from '../actionTypes';

const initialState = {
    moviesList: [],
    isFetching: false
};

const updateMoviesList = (state, action) => ({
    ...state,
    moviesList: action.movies
});

const setIsFetching = (state, action) => ({
    ...state,
    isFetching: action.isFetching
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_MOVIES_LIST: return updateMoviesList(state, action);
        case actionTypes.SET_IS_FETCHING: return setIsFetching(state, action);
        default: return state;
    }
};

export default reducer;
