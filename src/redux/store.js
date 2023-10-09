import { configureStore } from '@reduxjs/toolkit';
import leaguesReducer from './leaguesSlice';

const store = configureStore({
  reducer: {
    leagues: leaguesReducer,
  },
});

export default store;
