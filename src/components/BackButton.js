import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { HiChevronLeft } from 'react-icons/hi2';

const BackButton = ({ click }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (click) {
      click();
    } else {
      navigate(-1);
    }
  };

  return (
    <button className="home-btn" type="button" onClick={handleClick}>
      <HiChevronLeft />
    </button>
  );
};

BackButton.propTypes = {
  click: PropTypes.func,
};

BackButton.defaultProps = {
  click: null,
};

export default BackButton;
