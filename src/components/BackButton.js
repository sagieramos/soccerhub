import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <button type="button" onClick={handleClick}>
      Back
    </button>
  );
};

export default BackButton;
