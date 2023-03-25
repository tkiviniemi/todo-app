import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';

import NavLinks from './NavLinks';

describe('The Navigation Links', () => {
  test('Should only show TODOS and SIGNUP/LOGIN when not authorized', () => {
    render(
      <AuthContext.Provider
        value={{
          isLoggedIn: false,
          token: null,
          userId: null,
          login: () => {},
          logout: () => {},
        }}
      >
        <BrowserRouter>
          <NavLinks />;
        </BrowserRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByRole('list')).toHaveClass('nav-links');
    expect(screen.getByText('TODOS')).toBeInTheDocument();
    expect(screen.getByText('TODOS')).toHaveAttribute('href', '/');

    expect(screen.getByText('SIGNUP/LOGIN')).toBeInTheDocument();
    expect(screen.getByText('SIGNUP/LOGIN')).toHaveAttribute('href', '/auth');

    expect(screen.queryByText('ALL USERS')).toBeNull();
    expect(screen.queryByText('ADD TODO')).toBeNull();
    expect(screen.queryByText('LOGOUT')).toBeNull();
  });
  test('Should only show TODOS and SIGNUP/LOGIN when not authorized', () => {
    render(
      <AuthContext.Provider
        value={{
          isLoggedIn: true,
          token: 'test-token',
          userId: 'test-user-id',
          login: () => {},
          logout: () => {},
        }}
      >
        <BrowserRouter>
          <NavLinks />;
        </BrowserRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByRole('list')).toHaveClass('nav-links');
    expect(screen.getByText('TODOS')).toBeInTheDocument();
    expect(screen.getByText('TODOS')).toHaveAttribute('href', '/');

    expect(screen.getByText('ALL USERS')).toBeInTheDocument();
    expect(screen.getByText('ALL USERS')).toHaveAttribute('href', '/users');

    expect(screen.getByText('ADD TODO')).toBeInTheDocument();
    expect(screen.getByText('ADD TODO')).toHaveAttribute('href', '/todos/new');

    expect(screen.queryByText('SIGNUP/LOGIN')).toBeNull();

    expect(screen.getByRole('button', { name: 'LOGOUT' })).toBeInTheDocument();
  });
});
