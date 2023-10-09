import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLeagues } from '../redux/leaguesSlice';
import Indicator from './Indicator';
import arrowForward from '../assets/arrow_forward.svg';

const Leagues = () => {
  const dispatch = useDispatch();
  const { leagues, statusFetch } = useSelector((state) => state.leagues);
  const [leagueDetails, setLeagueDetails] = useState({});

  useEffect(() => {
    dispatch(fetchLeagues());
  }, [dispatch]);

  const handleArrowForward = (leagueID) => {
    setLeagueDetails(
      leagues.find((item) => item.id === leagueID),
    );
  };

  const handleArrowBackward = () => {
    setLeagueDetails({});
  };

  if (Object.keys(leagueDetails).length !== 0) {
    const { id, name } = leagueDetails;
    return (
      <div>
        <section>
          {id}
          {' '}
          {name}
        </section>
        <button type="button" onClick={() => handleArrowBackward()}>
          <img
            src={arrowForward}
            alt="arrow-forward"
            style={{ transform: 'scaleX(-1)' }}
          />
        </button>
      </div>
    );
  }

  if (statusFetch === 'loading') {
    return (
      <div className="indicator-contianer">
        <Indicator />
      </div>
    );
  }
  return (
    <section id="leagues">
      {leagues.map((league) => {
        const { id, name, logos } = league;
        return (
          <article key={id}>
            <button type="button" onClick={() => handleArrowForward(id)}>
              <img
                src={arrowForward}
                alt="arrow-forward"
              />
            </button>
            <img src={logos.light} alt="logo" />
            <h2>{name}</h2>
          </article>
        );
      })}
    </section>
  );
};

export default Leagues;
