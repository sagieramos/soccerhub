import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  clubStanding: {},
  lastViewYear: 2023,
  hasFetched: false,
};

export const fetchClubStanding = createAsyncThunk(
  'clubStanding/fetch',
  async (url, thunkAPI) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      thunkAPI.dispatch(fetchClubStanding.rejected(error));
      return null;
    }
  },
);

const StandingSlice = createSlice({
  name: 'clubStanding',
  initialState,
  reducers: {
    setClubStanding: (state, action) => {
      state.clubStanding = action.payload;
    },

    setLastViewYear: (state, action) => {
      state.lastViewYear = action.payload;
    },

    resetClubstanding: (state) => {
      state.clubStanding = initialState.clubStanding;
      state.hasFetched = initialState.hasFetched;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchClubStanding.fulfilled, (state, action) => {
      state.clubStanding = action.payload;
      state.hasFetched = true;
    });
  },
});

export const { setClubStanding, setLastViewYear, resetClubstanding } = StandingSlice.actions;
export default StandingSlice.reducer;
