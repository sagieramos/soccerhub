import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const leaguesUrl = 'http://api-football-standings.azharimm.dev/leagues';

export const fetchLeagues = createAsyncThunk('leagues/fetchLeagues', async (_, { getState, rejectWithValue }) => {
  try {
    const { leagues: leaguesState } = getState();
    if (leaguesState.hasFetched) {
      return leaguesState.leagues;
    }

    const resp = await fetch(leaguesUrl);
    const response = await resp.json();

    if (!response.status) {
      throw new Error('Failed to fetch leagues or server response with false status');
    }

    return response.data;
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
        state.leagues = action.payload;
        state.hasFetched = true;
      })
      .addCase(fetchLeagues.rejected, (state, action) => {
        state.statusFetch = 'failed';
        state.error = action.payload;
      });
  },
});

export const { refresh } = leaguesSlice.actions;
export default leaguesSlice.reducer;
