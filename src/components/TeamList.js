import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/redux-hooks';
import { resetClubstanding, fetchClubStanding } from '../redux/standingSlice';
import BackButton from './BackButton';
import Indicator from './Indicator';
import HomeButton from './HomeButton';
import '../styles/teamlist.scss';

const TeamList = () => {
  const { clubStanding, hasFetched } = useAppSelector((state) => state.clubStandings);
  const dispatch = useAppDispatch();
  const { leagueId, yearId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      fetchClubStanding(`https://api-football-standings.azharimm.dev/leagues/${leagueId.replace(/\//g, '')}/standings?season=${yearId}&sort=asc`),
    );
  }, [dispatch, leagueId, yearId]);

  const resetTeam = () => {
    dispatch(resetClubstanding());
  };

  const goHome = () => {
    navigate('/');
    resetTeam();
  };

  if (!hasFetched) {
    return (
      <div>
        <header>
          <BackButton />
          <h1>SOCCERHUB</h1>
          <HomeButton onClick={() => goHome()} />
        </header>
        <div className="indicator-container">
          <Indicator />
        </div>
      </div>
    );
  }
  if (clubStanding.status) {
    return (
      <div id="team-list">
        <header>
          <BackButton />
          <h1>SOCCERHUB</h1>
          <HomeButton onClick={() => goHome()} />
        </header>
        <article>
          <h1 className="team-list-title">
            <span>{clubStanding.data.season}</span>
            {' '}
            {clubStanding.data.name}
          </h1>
        </article>
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
                <span>{clubStanding.data.seasonDisplay}</span>
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
    <div>
      <header>
        <BackButton />
        <h1>SOCCERHUB</h1>
        <HomeButton onClick={() => goHome()} />
      </header>
      <div className="bad-url">No data for this URL</div>
    </div>
  );
};

export default TeamList;
