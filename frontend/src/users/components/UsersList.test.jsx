import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import UsersList from './UsersList';

const TEST_USER_DATA = [
  {
    id: '1',
    name: 'Test user 1',
    email: 'user1@test.com',
  },
  {
    id: '2',
    name: 'Test user 2',
    email: 'user2@test.com',
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

describe('The UsersList', () => {
  test('should show no users when no users is available', () => {
    render(<UsersList items={[]} />);
    expect(screen.getByText('No users found.')).toBeInTheDocument();
  });
  test('should show a list of users when users are available', () => {
    render(<UsersList items={TEST_USER_DATA} />, { wrapper });
    expect(screen.queryByText('No todos found.')).toBeNull();
    expect(screen.getByText('Test user 1')).toBeInTheDocument();
    expect(screen.getByText('user1@test.com')).toBeInTheDocument();
    expect(screen.getByText('Test user 2')).toBeInTheDocument();
    expect(screen.getByText('user2@test.com')).toBeInTheDocument();
  });
});
