import leaguesReducer, { refresh, setActiveChildPage } from '../redux/leaguesSlice';

describe('leaguesSlice', () => {
  test('should refresh leagues', () => {
    const initialState = { leagues: [], hasFetched: true, error: 'Error' };
    const newState = leaguesReducer(initialState, refresh());
    expect(newState.hasFetched).toEqual(false);
    expect(newState.error).toBeNull();
  });

  test('should set activeChildPage', () => {
    const initialState = { activeChildPage: null };
    const newState = leaguesReducer(initialState, setActiveChildPage('ChildPage'));
    expect(newState.activeChildPage).toEqual('ChildPage');
  });
});
