import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLeagues, setActiveChildPage } from '../redux/leaguesSlice';

const LeagueDetails = () => {
  const dispatch = useDispatch();
  const { leagues, activeChildPage, hasFetched } = useSelector((state) => state.leagues);
  const location = useLocation();

  useEffect(() => {
    if (!hasFetched) {
      dispatch(fetchLeagues());
    }

    if (!activeChildPage) {
      dispatch(setActiveChildPage(location.pathname));
    }
  }, [dispatch, hasFetched, activeChildPage, location.pathname]);

  const obj = leagues?.find((league) => league.id === activeChildPage);

  return (
    <div>
      <h2>LeagueDetails</h2>
      <Link to="/">Back</Link>
      <div>
        {obj?.name}
      </div>
    </div>
  );
};

export default LeagueDetails;
