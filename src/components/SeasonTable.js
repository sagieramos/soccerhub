import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Indicator from './Indicator';

const SeasonTable = () => {
  const { clubSeason } = useSelector((state) => state.clubSeason);
  const navigate = useNavigate();

  if (!clubSeason || !clubSeason.data) {
    return (
      <Indicator />
    );
  }

  const { seasons } = clubSeason.data;

  if (!seasons) {
    return (
      <div className="bad-url">No data for this URL</div>
    );
  }
  const handleViewStanding = (year) => {
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
