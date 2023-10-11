import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import League from '../components/Leagues';

describe('League Components', () => {
  test('should render without crashing', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <League />
        </MemoryRouter>
      </Provider>,
    );
  });
});
