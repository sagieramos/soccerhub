import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/errorPage.scss';

const ErrorPage = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div id="error-page-container">
      <header>
        <h1>SOCCERHUB</h1>
        <button className="home-btn" type="button" onClick={goHome}>
          Home
        </button>
      </header>
      <div className="error-page">
        <h1 className="error-heading">Oops! Something went wrong</h1>
        <p className="error-message">We&apos;re sorry, but there was an error.</p>
      </div>
    </div>
  );
};

export default ErrorPage;
