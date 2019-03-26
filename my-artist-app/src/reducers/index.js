import { createAction, handleActions } from 'redux-actions';

export const artistsUpdated = createAction('ARTISTS_UPDATED');
export const selectedArtistUpdated = createAction('SELECTED_ARTIST_UPDATED');

// Reducer
const INITIAL_STATE = {
    artists: [],
    selectedArtist: null,
};

export default handleActions(
    {
        [artistsUpdated]: (state, { payload }) => ({
            ...state,
            artists: payload,
        }),
        [selectedArtistUpdated]: (state, { payload }) => ({
            ...state,
            selectedArtist: payload,
        }),
    },
    INITIAL_STATE
);
