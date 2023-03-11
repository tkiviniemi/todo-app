import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import Users from './users/pages/Users';
import Todos from './todos/pages/Todos';
import AddTodo from './todos/pages/AddTodo';
import Authenticate from './users/pages/Authenticate';
import MainNavigation from './shared/components/navigation/MainNavigation';

import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <MainNavigation />
        <Routes>
          <Route path="/" element={<Todos />} />
          <Route path="/todos/new" element={<AddTodo />} />
          <Route path="/users" element={<Users />} />
          <Route path="/auth" element={<Authenticate />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
