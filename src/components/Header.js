import React from 'react';
import { useLocation } from 'react-router-dom';
import BackButton from './BackButton';
import HomeButton from './HomeButton';
import SeasonNav from './SeasonNav';

const Header = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/');

  return (
    <header>
      {
        pathSegments[1] ? (
          <div>
            {
                pathSegments[2] ? (
                  <BackButton />
                ) : null
            }

            <HomeButton />
          </div>
        ) : null
    }
      <SeasonNav />
      <h1>SOCCERHUB</h1>
    </header>
  );
};

export default Header;
