import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  first: null,
  lastFirst: null,
  second: null,
};

const routeSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    setFirstRoute: (state, action) => {
      state.first = action.payload;
    },
    setLastFirst: (state, action) => {
      state.lastFirst = action.payload;
    },
    setSecondRoute: (state, action) => {
      state.second = action.payload;
    },
    resetRoutes: (state) => {
      state.first = null;
      state.second = null;
    },
  },
});

export const {
  setFirstRoute, setLastFirst, setSecondRoute, resetRoutes,
} = routeSlice.actions;
export default routeSlice.reducer;
