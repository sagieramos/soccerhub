import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/redux-hooks';
import { fetchClubStanding } from '../redux/standingSlice';
import Indicator from './Indicator';
import '../styles/teamlist.scss';

const TeamList = () => {
  const { clubStanding, hasFetched } = useAppSelector((state) => state.clubStandings);
  const dispatch = useAppDispatch();
  const { leagueId, yearId } = useParams();

  useEffect(() => {
    dispatch(
      fetchClubStanding(`https://api-football-standings.azharimm.dev/leagues/${leagueId.replace(/\//g, '')}/standings?season=${yearId}&sort=asc`),
    );
  }, [dispatch, leagueId, yearId]);

  if (!hasFetched) {
    return (
      <div className="indicator-container">
        <Indicator />
      </div>
    );
  }
  if (clubStanding.status) {
    return (
      <div id="team-list">
        <main>
          {clubStanding.data.standings.map((team) => (
            <div key={team.team.id}>
              {team.team.logos && team.team.logos[0]?.href ? (
                <img src={team.team.logos[0].href} alt="logo" />
              ) : (
                null
              )}
              <h2>{team.team.name}</h2>
              <h3 className="sub-title">
                <span>{clubStanding.data.season}</span>
                {' '}
                {clubStanding.data.name}
              </h3>
              <article>
                <h3>Point</h3>
                <p>{team.stats.find((stat) => stat.name === 'points').value}</p>
              </article>
              <article>
                <h3>Games Played</h3>
                <p>{team.stats.find((stat) => stat.name === 'gamesPlayed').value}</p>
              </article>
              <article>
                <h3>Wins</h3>
                <p>{team.stats.find((stat) => stat.name === 'wins').value}</p>
              </article>
              <article>
                <h3>Losses</h3>
                <p>{team.stats.find((stat) => stat.name === 'losses').value}</p>
              </article>
              <article>
                <h3>Draw</h3>
                <p>{team.stats.find((stat) => stat.name === 'ties').value}</p>
              </article>
              <article>
                <h3>Goals</h3>
                <p>{team.stats.find((stat) => stat.name === 'pointsFor').value}</p>
              </article>
              <article>
                <h3>Goals Against</h3>
                <p>{team.stats.find((stat) => stat.name === 'pointsAgainst').value}</p>
              </article>
              <article>
                <h3>Goal Difference</h3>
                <p>{team.stats.find((stat) => stat.name === 'pointDifferential').displayValue}</p>
              </article>
              <article>
                <h3>Rank</h3>
                <p>{team.stats.find((stat) => stat.name === 'rank').value}</p>
              </article>
            </div>
          ))}
        </main>
      </div>
    );
  }
  return (
    <div className="bad-url">No data for this URL</div>
  );
};

export default TeamList;
