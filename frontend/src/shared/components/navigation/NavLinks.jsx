import { NavLink } from 'react-router-dom';
import './NavLinks.css';

const NavLinks = (props) => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          HOME
        </NavLink>
      </li>
      <li>
        <NavLink to="/users" exact>
          ALL USERS
        </NavLink>
      </li>
      <li>
        <NavLink to="/todos/new">ADD TODO</NavLink>
      </li>
      <li>
        <NavLink to="/auth">AUTHENTICATE</NavLink>
      </li>
      <li>
        <button>LOGOUT</button>
      </li>
    </ul>
  );
};

export default NavLinks;
