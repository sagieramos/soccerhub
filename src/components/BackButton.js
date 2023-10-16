import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { HiChevronLeft } from 'react-icons/hi2';

const BackButton = ({ click }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname.split('/');

  const handleClick = () => {
    if (click) {
      click();
    } else {
      const newPath = pathSegments.slice(0, -1).join('/');
      navigate(newPath, { replace: true });
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
