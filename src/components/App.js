import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { fetchLeagues } from '../redux/leaguesSlice';
import Leagues from './Leagues';
import LeagueDetails from './LeagueDetails';
import TeamList from './TeamList';

const App = () => {
  const dispatch = useDispatch();
  const { hasFetched } = useSelector((state) => state.leagues);

  if (!hasFetched) {
    dispatch(fetchLeagues());
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Leagues />} />
        <Route path="/:leagueId" element={<LeagueDetails />} />
        <Route path="/:leagueId/standing" element={<TeamList />} />
      </Routes>
    </Router>
  );
};

export default App;
