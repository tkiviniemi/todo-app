import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import TodosList from './TodosList';

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

describe('The TodosList', () => {
  test('should show no todos when no todos is available', () => {
    render(<TodosList items={[]} />);
    expect(screen.getByText('No todos found.')).toBeInTheDocument();
  });
  test('should show a list of todos when todos are available', () => {
    render(<TodosList items={TEST_TODO_DATA} />, { wrapper });
    expect(screen.queryByText('No todos found.')).toBeNull();
    expect(
      screen.getByText('Test task 1 - Test tag 1 - Not Done')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Test task 2 - Test tag 2 - Not Done')
    ).toBeInTheDocument();
  });
});
