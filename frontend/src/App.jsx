import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState, useCallback, useEffect } from 'react';

import Users from './users/pages/Users';
import Todos from './todos/pages/Todos';
import AddTodo from './todos/pages/AddTodo';
import Authenticate from './users/pages/Authenticate';
import MainNavigation from './shared/components/navigation/MainNavigation';

import { AuthContext } from './shared/context/auth-context';

import './App.css';

const queryClient = new QueryClient();

let logoutTimer;

function App() {
  const [token, setToken] = useState(false);
  const [userId, setuser] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState(false);

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setuser(uid);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setuser(null);
    setTokenExpirationDate(null);
    localStorage.removeItem('userData');
  }, []);

  // Check if the user is logged in
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

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
