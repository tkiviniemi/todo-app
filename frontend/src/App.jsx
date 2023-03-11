import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState, useCallback } from 'react';

import Users from './users/pages/Users';
import Todos from './todos/pages/Todos';
import AddTodo from './todos/pages/AddTodo';
import Authenticate from './users/pages/Authenticate';
import MainNavigation from './shared/components/navigation/MainNavigation';

import { AuthContext } from './shared/context/auth-context';

import './App.css';

const queryClient = new QueryClient();

function App() {
  const [token, setToken] = useState(false);
  const [userId, setuser] = useState(false);

  const login = useCallback((uid, token) => {
    setToken(token);
    setuser(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setuser(null);
  }, []);

  let routes;
  if (token) {
    routes = (
      <Routes>
        <Route exact path="/" element={<Todos />} />
        <Route path="/users" element={<Users />} />
        <Route path="/todos/new" element={<AddTodo />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route exact path="/" element={<Todos />} />
        <Route path="/auth" element={<Authenticate />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Router>
          <MainNavigation />
          <main>{routes}</main>
        </Router>
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}

export default App;
