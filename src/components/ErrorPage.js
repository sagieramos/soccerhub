import React from 'react';
import HomeButton from './HomeButton';
import '../styles/errorPage.scss';

const ErrorPage = () => (
  <div className="error-page">
    <h1 className="error-heading">Oops! Something went wrong</h1>
    <p className="error-message">We&apos;re sorry, but there was an error.</p>
    <HomeButton />
  </div>
);

export default ErrorPage;
