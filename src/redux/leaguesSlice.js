import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const leaguesUrl = 'http://api-football-standings.azharimm.dev/leagues';

const fetchLeagues = createAsyncThunk('leagues/fetchLeagues', async (_, { dispatch, getState, rejectWithValue }) => {
  const { leagues: leaguesState } = getState();
  if (leaguesState.hasFetched) {
    return leaguesState.leagues;
  }
  try {
    const response = await fetch(leaguesUrl);
    if (!response.ok) {
      const errorMessage = 'Failed to fetch leagues';
      dispatch(fetchLeagues.rejected(errorMessage));
      return rejectWithValue(errorMessage);
    }

    const responseData = await response.json();
    if (!responseData.status) {
      const errorMessage = 'Server response with false status';
      dispatch(fetchLeagues.rejected(errorMessage));
      return rejectWithValue(errorMessage);
    }

    leaguesState.hasFetched = true;
    return responseData.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const initialState = {
  leagues: [],
  hasFetched: false,
  statusFetch: 'idle',
  error: null,
};

const leaguesSlice = createSlice({
  name: 'leagues',
  initialState,
  reducers: {
    refresh: (state) => {
      state.hasFetched = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchLeagues.pending, (state) => {
        state.statusFetch = 'loading';
      })
      .addCase(fetchLeagues.fulfilled, (state, action) => {
        state.statusFetch = 'succeeded';
        if (!state.hasFetched) {
          state.leagues = action.payload;
        }
      })
      .addCase(fetchLeagues.rejected, (state, action) => {
        state.statusFetch = 'failed';
        state.error = action.payload;
      });
  },
});

export const { refresh } = leaguesSlice.actions;
export default leaguesSlice.reducer;
