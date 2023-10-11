import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const BackButton = ({ onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onClick();
    navigate(-1);
  };

  return (
    <button className="home-btn" type="button" onClick={handleClick}>
      Back
    </button>
  );
};

BackButton.propTypes = {
  onClick: PropTypes.func,
};

BackButton.defaultProps = {
  onClick: null,
};

export default BackButton;
