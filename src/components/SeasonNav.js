import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../redux/redux-hooks';
import { updateSecondRoutes } from '../redux/routeSlice';
import { resetClubstanding } from '../redux/standingSlice';

const SeasonNav = () => {
  const { clubSeason } = useAppSelector((state) => state.clubSeasons);
  const { seasons } = clubSeason.data;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const pathSegments = location.pathname.split('/');

  const handleChange = (e) => {
    const selectedYear = e.target.value;
    dispatch(updateSecondRoutes(selectedYear));
    dispatch(resetClubstanding());

    pathSegments[2] = selectedYear;

    const newPath = pathSegments.join('/');

    navigate(newPath, { replace: true });
  };

  return (
    <select name="year" id="year" value={pathSegments[2]} onChange={handleChange}>
      {seasons.map((season) => (
        <option key={season.year} value={season.year}>
          {season.year}
        </option>
      ))}
    </select>
  );
};

export default SeasonNav;
