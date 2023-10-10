import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  clubSeason: {},
  hasFetched: false,
};

export const fetchClubSeason = createAsyncThunk(
  'clubSeason/fetch',
  async (url, thunkAPI) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      thunkAPI.dispatch(fetchClubSeason.rejected(error));
      return null;
    }
  },
);

const clubSeasonSlice = createSlice({
  name: 'clubSeason',
  initialState,
  reducers: {
    setClubSeason: (state, action) => {
      state.clubSeason = action.payload;
    },
    resetClubseason: (state) => {
      state.clubSeason = initialState.clubSeason;
      state.hasFetched = initialState.hasFetched;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchClubSeason.fulfilled, (state, action) => {
      state.clubSeason = action.payload;
      state.hasFetched = true;
    });
  },
});

export const { setClubSeason, resetClubseason } = clubSeasonSlice.actions;
export default clubSeasonSlice.reducer;
