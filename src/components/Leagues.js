import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLeagues, setActiveChildPage } from '../redux/leaguesSlice';
import Indicator from './Indicator';
import arrowForward from '../assets/arrow_forward.svg';

const Leagues = () => {
  const dispatch = useDispatch();
  const { leagues, statusFetch } = useSelector((state) => state.leagues);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchLeagues());
  }, [dispatch]);

  const handleClick = (id) => {
    dispatch(setActiveChildPage(id));
    navigate(`/${id}`, { replace: true });
  };

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
            <button type="button" onClick={() => handleClick(id)}>
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
