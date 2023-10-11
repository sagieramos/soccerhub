import clubSeasonReducer, { setClubSeason, resetClubseason } from '../redux/clubSeasonSlice';

describe('clubSeasonSlice', () => {
  test('should set clubSeason', () => {
    const initialState = { clubSeason: {}, hasFetched: false };
    const newState = clubSeasonReducer(initialState, setClubSeason({ name: 'Club' }));
    expect(newState.clubSeason.name).toEqual('Club');
  });

  test('should reset clubSeason', () => {
    const initialState = { clubSeason: { name: 'Club' }, hasFetched: true };
    const newState = clubSeasonReducer(initialState, resetClubseason());
    expect(newState.clubSeason).toEqual({});
    expect(newState.hasFetched).toEqual(false);
  });
});
