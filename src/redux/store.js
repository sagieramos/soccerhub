import { configureStore } from '@reduxjs/toolkit';
import leaguesReducer from './leaguesSlice';
import clubSeasonReducer from './clubSeasonSlice';
import standingReducer from './standingSlice';
import routeReducer from './routeSlice';

const store = configureStore({
  reducer: {
    leagues: leaguesReducer,
    clubSeasons: clubSeasonReducer,
    clubStandings: standingReducer,
    routes: routeReducer,
  },
  /* devTools: true, */
});

export default store;
