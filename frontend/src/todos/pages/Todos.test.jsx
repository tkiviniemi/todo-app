import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import * as ReactQuery from 'react-query';

import Todos from './Todos';

const TEST_TODO_DATA = [
  {
    id: '1',
    task: 'Test task 1',
    tag: 'Test tag 1',
    done: false,
  },
  {
    id: '2',
    task: 'Test task 2',
    tag: 'Test tag 2',
    done: false,
  },
];

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('The Todos Page', () => {
  test('Should show a loading spinner while waiting', () => {
    vi.spyOn(ReactQuery, 'useQuery').mockImplementation(
      vi.fn().mockReturnValue({
        isLoading: true,
        error: null,
        data: [],
      })
    );
    render(<Todos />, { wrapper });
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });
  test('Should show a list of todos when todos are available', () => {
    vi.spyOn(ReactQuery, 'useQuery').mockImplementation(
      vi.fn().mockReturnValue({
        isLoading: false,
        error: null,
        data: TEST_TODO_DATA,
      })
    );
    render(<Todos items={TEST_TODO_DATA} />, { wrapper });
    expect(
      screen.queryByText('Test task 1 - Test tag 1 - Not Done')
    ).toBeInTheDocument();
  });
  test('Should show a error when there is one.', () => {
    vi.spyOn(ReactQuery, 'useQuery').mockImplementation(
      vi.fn().mockReturnValue({
        isLoading: false,
        error: { message: 'TEST_ERROR' },
        data: [],
      })
    );
    render(<Todos items={TEST_TODO_DATA} />, { wrapper });
    screen.debug();
    expect(
      screen.queryByText('An error has occurred: TEST_ERROR')
    ).toBeInTheDocument();
  });
});
