import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { fetchLeagues } from '../redux/leaguesSlice';
import Leagues from './Leagues';
import LeagueDetails from './LeagueDetails';

const App = () => {
  const dispatch = useDispatch();
  const { leagues, hasFetched } = useSelector((state) => state.leagues);

  if (!hasFetched) {
    dispatch(fetchLeagues());
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Leagues />} />
        {
          hasFetched
          && leagues?.map((item) => <Route key={item.id} path={`/${item.id}`} element={<LeagueDetails />} />)
        }
      </Routes>
    </Router>
  );
};

export default App;
