import { useQuery } from 'react-query';

import LoadingSpinner from '../../shared/components/loadingspinner/LoadingSpinner';
import { getTodos } from '../api/todos';

import TodosList from '../components/TodosList';

const Todos = () => {
  const { isLoading, error, data } = useQuery('todosData', () => getTodos());

  if (isLoading)
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );

  if (error) return 'An error has occurred: ' + error.message;

  return <TodosList items={data} />;
};

export default Todos;
