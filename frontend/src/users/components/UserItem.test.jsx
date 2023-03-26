import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import UserItem from './UserItem';

const TEST_USER_DATA = {
  id: '1',
  name: 'Test user 1',
  email: 'user1@test.com',
  image: 'https://static.thenounproject.com/png/4035892-200.png',
};

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

describe('The TodoItem', () => {
  test('should show a user when given', () => {
    render(
      <UserItem
        key={TEST_USER_DATA.id}
        id={TEST_USER_DATA.id}
        name={TEST_USER_DATA.name}
        email={TEST_USER_DATA.email}
        image={TEST_USER_DATA.image}
      />,
      { wrapper }
    );
    expect(screen.getByText('Test user 1')).toBeInTheDocument();
    expect(screen.getByText('user1@test.com')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Test user 1');
  });
});
