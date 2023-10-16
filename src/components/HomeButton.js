import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BiHomeAlt2 } from 'react-icons/bi';

const HomeButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <button className="home-btn" type="button" onClick={handleClick}>
      <BiHomeAlt2 />
    </button>
  );
};

export default HomeButton;
