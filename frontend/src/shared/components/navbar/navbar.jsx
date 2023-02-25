import { Link } from 'react-router-dom';

import Button from '../button/Button';
import './navbar.css';

const Navbar = () => {
  return (
    <nav>
      <div className="navbar">
        <Button inverse size="small">
          <Link to="/">Home</Link>
        </Button>
        <Button inverse size="small">
          <Link to="/todos">Todos</Link>
        </Button>
        <Button inverse size="small">
          <Link to="/todos/new">Create new Todo</Link>
        </Button>
        <Button inverse size="small">
          <Link to="/users">Users</Link>
        </Button>
        <Button inverse size="small">
          <Link to="/auth">Signup/Login</Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
