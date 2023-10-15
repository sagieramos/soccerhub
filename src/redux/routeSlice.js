import { createSlice } from '@reduxjs/toolkit';

const shiftArray = (array, route) => {
  const [first] = array;
  array[1] = first;
  array[0] = route;

  return array;
};

const initialState = {
  firstRoutes: [null, null],
  secondRoutes: [null, null],
};

const routeSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    updateFirstRoutes: (state, action) => {
      state.firstRoutes = shiftArray(state.firstRoutes, action.payload);
    },
    updateSecondRoutes: (state, action) => {
      state.secondRoutes = shiftArray(state.secondRoutes, action.payload);
    },
    resetRoutes: (state) => {
      state.firstRoutes = initialState.firstRoutes;
      state.secondRoutes = initialState.secondRoutes;
    },
  },
});

export const { updateFirstRoutes, updateSecondRoutes, resetRoutes } = routeSlice.actions;
export default routeSlice.reducer;
