import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Leagues from '../components/Leagues';

test('Leagues component renders correctly', () => {
  render(<Leagues />);

  // Test loading indicator by class name
  const indicator = screen.getByClassName('indicator-container');
  expect(indicator).toBeInTheDocument();

  // Mock API request to return data (you can use Jest mocks or libraries like axios-mock-adapter)

  // Test the rendered data once the API request is resolved
  const leagueButton = screen.getByText('Premier League');
  expect(leagueButton).toBeInTheDocument();

  // Simulate a button click
  fireEvent.click(leagueButton);

  // Add more assertions for the behavior you want to test
});
