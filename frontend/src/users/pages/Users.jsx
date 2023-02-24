import { useQuery } from 'react-query';

import LoadingSpinner from '../../shared/components/loadingspinner/LoadingSpinner';
import UsersList from '../components/UsersList';

const Users = () => {
  const { isLoading, error, data } = useQuery('usersData', () =>
    fetch('http://localhost:5000/api/users').then((res) => res.json())
  );

  if (isLoading)
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );

  if (error) return 'An error has occurred: ' + error.message;

  return <UsersList items={data} />;
};

export default Users;
