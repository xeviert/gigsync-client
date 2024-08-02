import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ArtistsApiServices from '@/services/artists-api-services';

// Define the async thunk
export const fetchArtists = createAsyncThunk(
  'artists/fetchArtists',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ArtistsApiServices.getAllArtists();
      return response.data; // Ensure the API response data is in the expected format
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch artists');
    }
  }
);

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArtists.fulfilled, (state, action) => {
        state.loading = false;
        state.artists = action.payload; // Store fetched artists in the state
      })
      .addCase(fetchArtists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store any error that occurred
      });
  },
});

export const { setArtists } = artistSlice.actions;

export default artistSlice.reducer;
