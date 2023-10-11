import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLeagues, setActiveChildPage } from '../redux/leaguesSlice';
import { fetchClubSeason, resetClubseason } from '../redux/clubSeasonSlice';
import SeasonTable from './SeasonTable';
import '../styles/leagueDetail.scss';

const LeagueDetails = () => {
  const dispatch = useDispatch();
  const { leagues, activeChildPage, hasFetched } = useSelector((state) => state.leagues);
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
      <button type="button" onClick={handleBackClick}>Home</button>
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
