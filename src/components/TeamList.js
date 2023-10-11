import React from 'react';
import { useSelector } from 'react-redux';
import BackButton from './BackButton';

function TeamList() {
  const { clubStanding } = useSelector((state) => state.clubStanding);

  console.log(clubStanding);

  return (
    <div>
      <BackButton />
      <h1>2018 Chinese Super League Teams</h1>
      <button type="button">Sort by Points</button>
      <ul>
        <p>Click the Sort by Points button to sort the teams.</p>
      </ul>
    </div>
  );
}

export default TeamList;
