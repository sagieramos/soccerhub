import standingReducer, { setClubStanding, resetClubstanding } from '../redux/standingSlice';

describe('standingSlice', () => {
  test('should set clubStanding', () => {
    const initialState = { clubStanding: {}, hasFetched: false };
    const newState = standingReducer(initialState, setClubStanding({ position: 1 }));
    expect(newState.clubStanding.position).toEqual(1);
  });

  test('should reset clubStanding', () => {
    const initialState = { clubStanding: { position: 1 }, hasFetched: true };
    const newState = standingReducer(initialState, resetClubstanding());
    expect(newState.clubStanding).toEqual({});
    expect(newState.hasFetched).toEqual(false);
  });
});
