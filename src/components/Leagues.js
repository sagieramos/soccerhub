import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/redux-hooks';
import { fetchLeagues, setActiveChildPage } from '../redux/leaguesSlice';
import { resetClubseason } from '../redux/clubSeasonSlice';
import { setFirstRoute } from '../redux/routeSlice';
import Indicator from './Indicator';
import arrowForward from '../assets/arrow_forward.svg';
import '../styles/leagues.scss';

const Leagues = () => {
  const dispatch = useAppDispatch();
  const { leagues, statusFetch } = useAppSelector((state) => state.leagues);
  const { first } = useAppSelector((state) => state.routes);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchLeagues());
  }, [dispatch]);

  const handleClick = (id) => {
    if (id !== first) {
      dispatch(setFirstRoute(id));
      dispatch(resetClubseason());
    }
    dispatch(setActiveChildPage(`/${id}`));
    navigate(`/${id}`, { replace: true });
  };

  if (statusFetch === 'loading') {
    return (
      <div>
        <header>
          <h1>SOCCERHUB</h1>
        </header>
        <div className="indicator-container">
          <Indicator />
        </div>
      </div>
    );
  }

  return (
    <div id="league-container">
      <header>
        <h1 id="app-name">SOCCERHUB</h1>
      </header>
      <section id="leagues">
        {leagues?.map((league) => {
          const { id, name, logos } = league;
          return (
            <button type="button" className="article" key={id} onClick={() => handleClick(id)}>
              <button type="button">
                <img
                  src={arrowForward}
                  alt="arrow-forward"
                />
              </button>
              <img src={logos.light} alt="logo" />
              <h2>{name}</h2>
            </button>
          );
        })}
      </section>
    </div>
  );
};

export default Leagues;
