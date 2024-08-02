import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  artists: [],
  loading: false,
  error: null,
};

const artistSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {
    setArtists(state, action) {
      state.artists = action.payload;
    },
    fetchArtistsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchArtistsSuccess(state, action) {
      state.loading = false;
      state.artists = action.payload;
    },
    fetchArtistsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setArtists,
  fetchArtistsRequest,
  fetchArtistsSuccess,
  fetchArtistsFailure,
} = artistSlice.actions;

export default artistSlice.reducer;
