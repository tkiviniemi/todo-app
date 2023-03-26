import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import TodoItem from './TodoItem';

const TEST_TODO_DATA = {
  id: '1',
  task: 'Test task 1',
  tag: 'Test tag 1',
  done: false,
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
  test('should show a todo when given', () => {
    render(
      <TodoItem
        key={TEST_TODO_DATA.id}
        id={TEST_TODO_DATA.id}
        task={TEST_TODO_DATA.task}
        tag={TEST_TODO_DATA.tag}
        done={TEST_TODO_DATA.done}
      />,
      { wrapper }
    );
    expect(
      screen.getByText('Test task 1 - Test tag 1 - Not Done')
    ).toBeInTheDocument();
    expect(screen.getByRole('listitem')).toHaveClass('todo-item');
  });
});
