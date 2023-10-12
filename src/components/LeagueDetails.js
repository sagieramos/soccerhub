import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/redux-hooks';
import { fetchLeagues, setActiveChildPage } from '../redux/leaguesSlice';
import { fetchClubSeason, resetClubseason } from '../redux/clubSeasonSlice';
import SeasonTable from './SeasonTable';
import '../styles/leagueDetail.scss';

const LeagueDetails = () => {
  const dispatch = useAppDispatch();
  const { leagues, activeChildPage, hasFetched } = useAppSelector((state) => state.leagues);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasFetched) {
      dispatch(fetchLeagues());
    }

    if (!activeChildPage) {
      dispatch(setActiveChildPage(location.pathname.replace(/\//g, '')));
    }
  }, [dispatch, hasFetched, activeChildPage, location.pathname]);

  useEffect(() => {
    if (activeChildPage) {
      dispatch(fetchClubSeason(`https://api-football-standings.azharimm.dev/leagues/${activeChildPage.replace(/\//g, '')}/seasons`));
    }
  }, [dispatch, activeChildPage]);

  const obj = leagues?.find((league) => league.id === location.pathname.replace(/\//g, ''));

  const handleBackClick = () => {
    dispatch(resetClubseason());
    navigate('/');
  };

  return (
    <div className="league-detail">
      <header>
        <h1 id="app-name">SOCCERHUB</h1>
        <button className="home-btn" type="button" onClick={handleBackClick}>Home</button>
      </header>
      {obj && (
        <div>
          <img src={obj.logos.light} alt="logo" />
          <div>{obj.name}</div>
        </div>
      )}
      <SeasonTable />
    </div>
  );
};

export default LeagueDetails;
