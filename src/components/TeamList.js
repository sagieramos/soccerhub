import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { resetClubstanding, fetchClubStanding } from '../redux/standingSlice';
import BackButton from './BackButton';
import Indicator from './Indicator';
import '../styles/teamlist.scss';

function TeamList() {
  const { clubStanding } = useSelector((state) => state.clubStanding);
  const dispatch = useDispatch();
  const { leagueId, yearId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      fetchClubStanding(`https://api-football-standings.azharimm.dev/leagues/${leagueId.replace(/\//g, '')}/standings?season=${yearId}&sort=asc`),
    );
  }, [dispatch, leagueId, yearId]);
  console.log(leagueId, yearId);

  const resetTeam = () => {
    dispatch(resetClubstanding());
  };

  const goHome = () => {
    navigate('/');
    resetTeam();
  };

  if (!clubStanding.data) {
    return (
      <div>
        <header>
          <h1>SOCCERHUB</h1>
          <BackButton onClick={() => resetTeam()} />
          <button className="home-btn" type="button" onClick={() => goHome()}>Home</button>
        </header>
        <div className="indicator-container">
          <Indicator />
        </div>
      </div>
    );
  }

  return (
    <div id="team-list">
      <header>
        <h1>SOCCERHUB</h1>
        <BackButton onClick={() => resetTeam()} />
        <button className="home-btn" type="button" onClick={() => goHome()}>Home</button>
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

export default TeamList;
