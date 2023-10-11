import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Indicator from './Indicator';
import { fetchClubStanding } from '../redux/standingSlice';

const SeasonTable = () => {
  const { clubSeason } = useSelector((state) => state.clubSeason);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  if (!clubSeason || !clubSeason.data) {
    return (
      <Indicator />
    );
  }

  const { seasons } = clubSeason.data;

  if (!seasons) {
    return (
      <div>No seasons available</div>
    );
  }
  const handleViewStanding = (year) => {
    const url = `https://api-football-standings.azharimm.dev/leagues/${location.pathname.replace(/\//g, '')}/standings?season=${year}&sort=asc`;
    dispatch(fetchClubStanding(url));
    navigate('./standing');
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
          {seasons.map((item) => {
            const { year, startDate, endDate } = item;
            return (
              <tr key={year}>
                <td>{year}</td>
                <td>{startDate}</td>
                <td>{endDate}</td>
                <td>
                  <button type="button" onClick={() => handleViewStanding(year)}>show standing</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default SeasonTable;
