import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../redux/redux-hooks';
import { updateSecondRoutes } from '../redux/routeSlice';
import { resetClubstanding } from '../redux/standingSlice';
import { fetchClubSeason } from '../redux/clubSeasonSlice';

const SeasonNav = () => {
  const { clubSeason, hasFetched } = useAppSelector((state) => state.clubSeasons);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname.split('/');

  useEffect(() => {
    if (!hasFetched && pathSegments[2]) {
      dispatch(fetchClubSeason(`https://api-football-standings.azharimm.dev/leagues/${pathSegments[1]}/seasons`));
    }
  }, [hasFetched, dispatch, pathSegments]);

  const handleChange = (e) => {
    const selectedYear = e.target.value;
    dispatch(updateSecondRoutes(selectedYear));
    dispatch(resetClubstanding());

    pathSegments[2] = selectedYear;

    const newPath = pathSegments.join('/');

    navigate(newPath, { replace: true });
  };

  if (clubSeason.status && pathSegments[2]) {
    const { seasons } = clubSeason.data;
    return (
      <select name="year" id="year" value={pathSegments[2]} onChange={handleChange}>
        {seasons.map((season) => (
          <option key={season.year} value={season.year}>
            {season.year}
          </option>
        ))}
      </select>
    );
  }
  return null;
};

export default SeasonNav;
