const state = {
  leagues: {
    data: [
      {
        id: 1,
        name: 'Premier League',
        logos: {
          light: 'premier-league-logo.png',
        },
      },
      {
        id: 2,
        name: 'La Liga',
        logos: {
          light: 'la-liga-logo.png',
        },
      },
    ],
    statusFetch: 'succeeded',
  },
  hasFetched: false,
  activeChildPage: null,
  error: null,
};

const testUseAppSelector = (f) => f(state);

export default testUseAppSelector;
