import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Leagues from './Leagues';
import LeagueDetails from './LeagueDetails';
import TeamList from './TeamList';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Leagues />} />
      <Route path="/:leagueId" element={<LeagueDetails />} />
      <Route path="/:leagueId/:yearId" element={<TeamList />} />
    </Routes>
  </Router>
);

export default App;
