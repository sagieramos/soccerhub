import { configureStore } from '@reduxjs/toolkit';
import leaguesReducer from './leaguesSlice';
import clubSeasonReducer from './clubSeasonSlice';
import standingReducer from './standingSlice';

const store = configureStore({
  reducer: {
    leagues: leaguesReducer,
    clubSeasons: clubSeasonReducer,
    clubStandings: standingReducer,
  },
});

export default store;
