import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../redux/redux-hooks';
import { resetClubstanding } from '../redux/standingSlice';
import { setSecondRoute, setLastFirst } from '../redux/routeSlice';
import Indicator from './Indicator';

const SeasonTable = () => {
  const { first, lastFirst, second } = useAppSelector((state) => state.routes);
  const { clubSeason } = useAppSelector((state) => state.clubSeasons);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  if (!clubSeason || !clubSeason.data) {
    return (
      <div className="indicator-child">
        <Indicator />
      </div>
    );
  }

  const { seasons } = clubSeason.data;

  if (!seasons) {
    return (
      <div className="bad-url">No data for this URL</div>
    );
  }

  const handleViewStanding = (year) => {
    if (year !== second || first !== lastFirst) {
      dispatch(setSecondRoute(year));
      dispatch(setLastFirst(first));
      dispatch(resetClubstanding());
    }
    navigate(`./${year}`);
  };

  return (
    <section className="club-season-table">
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {seasons.map(({ year, startDate, endDate }) => (
            <tr key={year}>
              <td>{year}</td>
              <td>{startDate}</td>
              <td>{endDate}</td>
              <td>
                <button type="button" onClick={() => handleViewStanding(year)}>show standing</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default SeasonTable;
