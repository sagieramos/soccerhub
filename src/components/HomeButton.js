import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiHome } from 'react-icons/hi2';

const HomeButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <button className="home-btn" type="button" onClick={handleClick}>
      <HiHome />
    </button>
  );
};

export default HomeButton;
