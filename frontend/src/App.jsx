import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import Users from './users/pages/Users';
import Todos from './todos/pages/Todos';
import AddTodo from './todos/pages/AddTodo';
import Authenticate from './users/pages/Authenticate';
import Navbar from './shared/components/navbar/Navbar';

import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/todos" element={<Todos />} />
          <Route path="/todos/new" element={<AddTodo />} />
          <Route path="/users" element={<Users />} />
          <Route path="/auth" element={<Authenticate />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
